const router = require("express").Router();
const {
  signUpUser,
  updateUser,
  deleteUser,
} = require("../../controllers/signUpController");
const { protect } = require("../../utils/auth");

// "/signup" route
router
  .route("/")
  .post(signUpUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
