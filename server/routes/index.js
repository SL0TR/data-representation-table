const router = require("express").Router();

router.use("/photos", require("./photos/photosRoute"));

module.exports = router;
