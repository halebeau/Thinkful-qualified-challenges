const router = require("express").Router({ mergeParams: true });
const controller = require("./comments.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/commenter-count")
  .get(controller.listCommenterCount)
  .all(methodNotAllowed);

router.route("/:commentId([0-9]+)").get(controller.read).all(methodNotAllowed);

module.exports = router;