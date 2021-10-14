const path = require("path");
const plants = require(path.resolve("src/data/plants-data"));
const nextId = require("../utils/nextId");

function bodyDataHas(propertyName) {
  return (req, res, next) => {
    const { data = {} } = req.body;
    const value = data[propertyName];
    if (value) {
      return next();
    }
    next({ status: 400, message: `Plant must include a ${propertyName}` });
  };
}

const hasName = bodyDataHas("name");
const hasScientificName = bodyDataHas("scientific_name");
const hasFamily = bodyDataHas("family");

function create(req, res) {
  const newPant = req.body.data;
  newPant.id = nextId();
  plants.push(newPant);
  res.status(201).json({ data: newPant });
}

function destroy(req, res) {
  const { plantId } = req.params;
  const index = plants.findIndex((plant) => plant.id === plantId);
  if (index > -1) {
    plants.splice(index, 1);
  }
  res.sendStatus(204);
}

function list(req, res) {
  res.json({ data: plants });
}

function plantIdExists(req, res, next) {
  const { plantId } = req.params;
  const foundPlant = plants.find((plant) => plant.id === plantId);
  if (foundPlant) {
    res.locals.plant = foundPlant;
    return next();
  }
  next({
    status: 404,
    message: `Plant id not found: ${req.params.plantId}`,
  });
}

function read(req, res) {
  res.json({ data: res.locals.plant });
}

function update(request, response) {
  const { id } = response.locals.plant;
  Object.assign(response.locals.plant, request.body.data, { id });
  response.json({ data: response.locals.plant });
}

module.exports = {
  create: [hasName, hasScientificName, hasFamily, create],
  list,
  read: [plantIdExists, read],
  update: [plantIdExists, hasName, hasScientificName, hasFamily, update],
  delete: [plantIdExists, destroy],
};
