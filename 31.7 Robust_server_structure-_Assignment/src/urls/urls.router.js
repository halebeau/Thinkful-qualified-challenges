const router = require("express").Router();
const methodDisallowed = require("../errors/methodDisallowed");
const usesRouter = require("../uses/uses.router");
const controller = require("./urls.controller");

router.use("/:urlId/uses", usesRouter);

router.route("/:urlId").get(controller.read).put(controller.update).all(methodDisallowed);
router.route("/").get(controller.list).post(controller.create).all(methodDisallowed);

module.exports = router;