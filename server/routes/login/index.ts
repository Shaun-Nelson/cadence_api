const router = require("express").Router();
const {
  login,
  loginSpotify,
  isLoggedIn,
} = require("../../controllers/loginController");
const { authMiddleware } = require("../../utils/auth");

// "/login" route
router.route("/").get(isLoggedIn).post(login);
router.route("/spotify").get(authMiddleware, loginSpotify);

module.exports = router;
