const router = require("express").Router();
const controller = require("./plants.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

//TODO make the necessary changes to enable CORS for the entire router.

// enables CORS for all routes in this router
router.use(cors());

router
  .route("/:plantId")
  //enables CORS for all methods on this route
  // .all(cors())
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  //enables CORS for all methods on this route
  // .all(cors())
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
