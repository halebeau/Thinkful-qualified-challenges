const path = require("path");
const users = require(path.resolve("src/data/users-data"));
const nextId = require("../utils/nextId");

function bodyDataHas(propertyName) {
  return (req, res, next) => {
    const { data = {} } = req.body;
    const value = data[propertyName];
    if (value) {
      return next();
    }
    next({ status: 400, message: `User must include a ${propertyName}` });
  };
}

const hasFirstName = bodyDataHas("first_name");
const hasLastName = bodyDataHas("last_name");
const hasEmail = bodyDataHas("email");

function create(req, res) {
  const newUser = req.body.data;
  newUser.id = nextId();
  users.push(newUser);
  res.status(201).json({ data: newUser });
}

function destroy(req, res) {
  const { userId } = req.params;
  const index = users.findIndex((user) => user.id === userId);
  if (index > -1) {
    users.splice(index, 1);
  }
  res.sendStatus(204);
}

function list(req, res) {
  res.json({ data: users });
}

function userIdExists(req, res, next) {
  const { userId } = req.params;
  const foundUser = users.find((user) => user.id === userId);
  if (foundUser) {
    res.locals.user = foundUser;
    return next();
  }
  next({
    status: 404,
    message: `User id not found: ${req.params.userId}`,
  });
}

function read(req, res) {
  res.json({ data: res.locals.user });
}

function update(request, response) {
  const { id } = response.locals.user;
  Object.assign(response.locals.user, request.body.data, { id });
  response.json({ data: response.locals.user });
}

module.exports = {
  create: [hasFirstName, hasLastName, hasEmail, create],
  list,
  read: [userIdExists, read],
  update: [userIdExists, hasFirstName, hasLastName, hasEmail, update],
  delete: [userIdExists, destroy],
};
