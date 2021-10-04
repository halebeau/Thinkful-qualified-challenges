const urls = require("../data/urls-data");
const uses = require("../data/uses-data");
const pathNotFound = require("../errors/pathNotFound");

const hasHref = (req, res, next) => {
  const {
    data: { href = null },
  } = req.body;
  if (!href) {
    next({ status: 400, message: "Input data must contain href key." });
  }
  res.locals.href = href;
  next();
};

const urlExists = (req, res, next) => {
  const { urlId = null } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (!foundUrl) {
    pathNotFound(req, res, next);
  }
  res.locals.url = foundUrl;
  next();
};

const recordUse = (req, res, next) => {
  uses.push({
    id: uses.length + 1,
    urlId: res.locals.url.id,
    time: Date.now(),
  });
  next();
};

function create(req, res) {
  const id = urls.length + 1;
  const href = res.locals.href;
  const newData = { id: id, href };
  urls.push(newData);
  res.status(201).json({ data: newData });
}

function list(req, res) {
  res.json({ data: urls });
}

function read(req, res) {
  res.json({ data: res.locals.url });
}

function update(req, res) {
  const oldData = res.locals.url;
  const newData = res.locals.href
  const index = urls.indexOf(oldData)
  urls[index].href = newData
  res.status(200).json({data: urls[index]})
}

module.exports = {
  list,
  create: [hasHref, create],
  read: [urlExists, recordUse, read],
  update: [hasHref, urlExists, update],
};