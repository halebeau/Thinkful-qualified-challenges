const uses = require("../data/uses-data");
const urls = require("../data/urls-data");
const pathNotFound = require("../errors/pathNotFound");

const collectParams = (req, res, next) => {
  const { urlId = null } = req.params;
  const { useId = null } = req.params;
  if (useId === null) {
    pathNotFound(req, res, next);
  }
  res.locals.urlId = Number(urlId);
  res.locals.useId = Number(useId);
  next();
};

const paramsExist = (req, res, next) => {
  let foundUse;
  const useId = res.locals.useId;
  const urlId = res.locals.urlId;
  if (!urlId) {
    foundUse = uses.find((use) => use.id === useId);
  } else {
    foundUse = uses.find((use) => use.id === useId && use.urlId === urlId);
    if (foundUse)
      res.locals.urlUses = uses.filter((use) => use.urlId === res.locals.urlId);
  }
  if (!foundUse) {
    pathNotFound(req, res, next);
  }
  res.locals.use = foundUse;
  next();
};

const listLogic = (req, res, next) => {
  const { urlId = null } = req.params;

  if (urlId) {
    const existentUrl = urls.find((url) => url.id == urlId);
    if (!existentUrl)
      next({
        status: 404,
        message: `urlId ${urlId} does not exist in the database`,
      });
    res.locals.url = existentUrl;
    const usesObj = uses.find((use) => use.urlId == urlId);
    const availUseId = uses.reduce((id, use) => use.id, 0) + 1;
    const newUse = { id: availUseId, urlId: urlId, time: Date.now() };
    if (!usesObj) uses.push(newUse);
    res.locals.uses = uses.filter((use) => use.urlId == urlId);
  }
  next();
};

function list(req, res) {
  const { urlId = null } = req.params;

  if (urlId) {
    const usesArr = res.locals.uses;
    res.status(200).json({ data: usesArr });
  } else {
    res.status(200).json({ data: uses });
  }
}

function read(req, res) {
  res.status(200).json({ data: res.locals.use });
}

function destroy(req, res) {
  const index = uses.findIndex((use) => use.id === res.locals.useId);
  uses.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  read: [collectParams, paramsExist, read],
  delete: [collectParams, paramsExist, destroy],
  list: [listLogic, list],
};