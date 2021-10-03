const router = require('express').Router({ mergeParams: true })
const methodDisallowed = require('../errors/methodDisallowed');
const controller = require("./ratings.controller");

router.route('/:ratingId')
    .get(controller.read)
    .all(methodDisallowed)

router.route('/')
    .get(controller.list)
    .all(methodDisallowed)


module.exports = router