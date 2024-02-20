const Playlist = require("../models/Playlist");

module.exports = {
  getPlaylists: async function (req: any, res: any) {
    try {
      const playlists = await Playlist.find({ username: req.user.username });

      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).send({ message: "Error getting playlists" });
    }
  },
  createPlaylist: async function (req: any, res: any) {
    try {
      const { title, artists, duration, previewUrl, image, link } =
        req.body.results;

      console.log(req.body.results);

      const playlist = await Playlist.create({
        name: req.body.playlistName,
        description: req.body.playlistDescription,
        tracks: [
          {
            title,
            artists,
            duration,
            previewUrl,
            image,
            link,
          },
        ],
        username: req.user.username,
      });

      res.status(201).json({ message: "Playlist created", playlist });
    } catch (error) {
      res.status(500).send({ message: "Error creating playlist" });
    }
  },
  deletePlaylist: async function (req: any, res: any) {
    try {
      const playlist = await Playlist.findOneAndDelete({
        name: req.body.name,
        user: req.user._id,
      });
      console.log(playlist);
    } catch (error) {
      res.status(500).send({ message: "Error deleting playlist" });
    }
  },
};
