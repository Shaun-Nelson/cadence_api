const router = require("express").Router();
const { callback } = require("../../controllers/callbackController");
const { protect } = require("../../utils/auth");

// "/callback" route
router.route("/").get(protect, callback);

module.exports = router;
