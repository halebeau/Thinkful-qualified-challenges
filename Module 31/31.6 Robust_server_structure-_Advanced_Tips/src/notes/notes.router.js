const router = require("express").Router({mergeParams:true});
const methodDisallowed = require("../errors/methodDisallowed");
const controller = require("./notes.controller");
const ratingsRouter = require("../ratings/ratings.router");

router.use("/:noteId/ratings", controller.noteExists, ratingsRouter);

router
  .route("/:noteId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodDisallowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodDisallowed);

module.exports = router;