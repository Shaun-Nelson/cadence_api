const router = require("express").Router();
const {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
} = require("../../controllers/playlistsController");
const { protect } = require("../../utils/auth");

// Matches with "/api/playlists"
router
  .route("/")
  .get(protect, getPlaylists)
  .post(protect, createPlaylist)
  .delete(protect, deletePlaylist);

module.exports = router;
