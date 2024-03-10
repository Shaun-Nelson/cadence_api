const router = require("express").Router();
const {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  createSpotifyPlaylist,
} = require("../../controllers/playlistsController");
const { protect } = require("../../utils/auth");

// Matches with "/api/playlists"
router
  .route("/")
  .get(protect, getPlaylists)
  .post(protect, createPlaylist)
  .delete(protect, deletePlaylist);

router.route("/spotify").post(protect, createSpotifyPlaylist);

module.exports = router;
