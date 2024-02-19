const router = require("express").Router();
const { callback } = require("../../controllers/callbackController");

// "/callback" route
router.route("/").get(callback);

module.exports = router;
