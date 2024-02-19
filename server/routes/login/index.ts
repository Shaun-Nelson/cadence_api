const router = require("express").Router();
const {
  login,
  loginSpotify,
  isLoggedIn,
  authUser,
} = require("../../controllers/loginController");
const { protect } = require("../../utils/auth");

// "/login" route
router.route("/").get(isLoggedIn).post(login);
router.route("/spotify").get(protect, loginSpotify);
router.route("/auth").post(protect, authUser);

module.exports = router;
