const router = require("express").Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../../controllers/userController");
const { protect } = require("../../utils/auth");

// /api/users
router.route("/").get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
