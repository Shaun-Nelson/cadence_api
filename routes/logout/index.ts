const router = require("express").Router();
const { logout } = require("../../controllers/logoutController");

// "/logout" route
router.route("/").get(logout);

module.exports = router;
