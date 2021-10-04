const router = require("express").Router({ mergeParams: true });
const methodDisallowed = require("../errors/methodDisallowed");
const controller = require("./uses.controller");

router
  .route("/:useId")
  .get(controller.read)
  .delete(controller.delete)
  .all(methodDisallowed);
router.route("/").get(controller.list).all(methodDisallowed);

module.exports = router;