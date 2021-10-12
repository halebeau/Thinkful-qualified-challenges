const router = require("express").Router({ mergeParams: true });
const controller = require("./restaurants.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/average-rating-by-owner")
  .get(controller.listAverageRatingByOwner)
  .all(methodNotAllowed);

router
  .route("/average-rating")
  .get(controller.averageRating)
  .all(methodNotAllowed);

router.route("/count").get(controller.count).all(methodNotAllowed);

router
  .route("/highest-rated")
  .get(controller.readHighestRated)
  .all(methodNotAllowed);

router
  .route("/:restaurantId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;