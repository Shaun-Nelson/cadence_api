const router = require("express").Router();
const {
  signUpUser,
  updateUser,
  deleteUser,
} = require("../../controllers/signUpController");
const { authMiddleware } = require("../../utils/auth");

// "/signUp" route
router
  .route("/")
  .post(signUpUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

module.exports = router;
