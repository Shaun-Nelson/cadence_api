const router = require("express").Router();
const { logout } = require("../../controllers/logoutController");
const { protect } = require("../../utils/auth");

// "/logout" route
router.route("/").get(protect, logout);

module.exports = router;
