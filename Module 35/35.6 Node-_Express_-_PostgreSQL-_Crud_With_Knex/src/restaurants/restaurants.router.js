const router = require("express").Router();
const controller = require("./restaurants.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:restaurantId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;