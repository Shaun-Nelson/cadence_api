const Playlist = require("../models/Playlist");

module.exports = {
  getPlaylists: async function (req: any, res: any) {
    try {
      const playlists = await Playlist.find({
        username: req.user.username,
      }).populate("tracks");

      res.status(201).json(playlists);
    } catch (error) {
      res.status(500).send({ message: "Error getting playlists" });
    }
  },
  createPlaylist: async function (req: any, res: any) {
    try {
      const tracks = req.body.results.map((track: any) => {
        const { title, artists, duration, previewUrl, image, link } = track;

        return {
          title,
          artists,
          duration,
          previewUrl,
          image,
          link,
        };
      });

      const playlist = await Playlist.create({
        name: req.body.playlistName,
        description: req.body.playlistDescription
          ? req.body.playlistDescription
          : "",
        tracks,
        username: req.user.username,
      });

      res.status(201).json({ message: "Playlist created", playlist });
    } catch (error) {
      res.status(500).json({ message: "Error creating playlist" });
    }
  },
  deletePlaylist: async function (req: any, res: any) {
    try {
      await Playlist.findOneAndDelete({
        name: req.body.name,
        user: req.user._id,
      });
    } catch (error) {
      res.status(500).send({ message: "Error deleting playlist", error });
    }
  },
};
