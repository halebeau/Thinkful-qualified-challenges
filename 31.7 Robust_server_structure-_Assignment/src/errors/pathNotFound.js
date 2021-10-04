function pathNotFound(req, res, next) {
  return next({
    status: 404,
    message: `404: ${req.originalUrl} does not lead to a known path or resource.`,
  });
}

module.exports = pathNotFound;