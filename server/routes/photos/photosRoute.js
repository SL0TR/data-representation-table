const router = require("express").Router();
const controller = require("./photosController");

router.route("/").get(controller.get);

module.exports = router;
