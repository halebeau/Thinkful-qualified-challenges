const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

//TODO  enable CORS for any GET to /users, and /users/:userId and for preflight requests

//* For a preflight request, you must enable CORS for both the OPTIONS method and any methods that may be a preflight request.

// passed some configuration information {methods: "DELETE"  to cors(), which enables CORS only for the GET method. Any CORS request using a method other than OPTIONS or GET will fail for this router.
const corsGet = cors({ methods: "GET" });

router
  .route("/:userId")
  .get(corsGet, controller.read)
  .put(controller.update)
  .delete(controller.delete)
  // The OPTIONS method must also allow CORS requests for a CORS preflight request to work.
  .options(corsGet)
  .all(methodNotAllowed);

router
  .route("/")
  .get(corsGet, controller.list)
  .post(controller.create)
  // The OPTIONS method must also allow CORS requests for a CORS preflight request to work.
  .options(corsGet)
  .all(methodNotAllowed);

module.exports = router;
