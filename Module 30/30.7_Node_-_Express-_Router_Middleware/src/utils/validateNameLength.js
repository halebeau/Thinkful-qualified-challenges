function validateNameLength(req, res, next) {
  const name = req.params.name;
  if (name.length < 3) {
    next("Name length is too short.");
  } else {
    next();
  }
}

module.exports = validateNameLength;