const router = require("express").Router();
const {
  login,
  loginSpotify,
  isLoggedIn,
  authUser,
} = require("../../controllers/loginController");
const { authMiddleware } = require("../../utils/auth");

// "/login" route
router.route("/").get(isLoggedIn).post(login);
router.route("/spotify").get(authMiddleware, loginSpotify);
router.route("/auth").post(authUser);

module.exports = router;
