const Playlist = require("../models/Playlist");
const spotifyWebApi = require("spotify-web-api-node");

module.exports = {
  getPlaylists: async function (req: any, res: any) {
    try {
      const playlists = await Playlist.find({
        username: req.user.username,
      }).populate("tracks");

      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).send({ message: "Error getting playlists" });
    }
  },
  createPlaylist: async function (req: any, res: any) {
    try {
      const tracks = JSON.parse(req.body.tracks);

      const playlist = await Playlist.create({
        name: req.body.name,
        description: req.body.playlistDescription
          ? req.body.playlistDescription
          : "",
        tracks,
        username: req.user.username,
      });

      return res.status(201).json({ message: "Playlist created", playlist });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating playlist: ${error}` });
    }
  },
  deletePlaylist: async function (req: any, res: any) {
    try {
      const playlist = await Playlist.deleteOne({
        name: req.body.name,
        username: req.user.username,
      });
      res.status(200).json({ message: "Playlist deleted", playlist });
    } catch (error) {
      res.status(500).send({ message: "Error deleting playlist", error });
    }
  },
  createSpotifyPlaylist: async function (req: any, res: any) {
    const { name, description } = req.body;
    const tracks = JSON.parse(req.body.tracks);

    if (!req.session.refresh_token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please connect to Spotify first." });
    }

    const spotifyApi = new spotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
      refreshToken: req.cookies.refresh_token,
      accessToken: req.cookies.access_token,
    });

    spotifyApi.refreshAccessToken().then(
      (data: any) => {
        console.log("The access token has been refreshed!");
        spotifyApi.setAccessToken(data.body["access_token"]);
      },
      (err: any) => {
        console.log("Could not refresh access token", err);
      }
    );

    try {
      const playlist = await spotifyApi.createPlaylist(name, {
        description,
        public: true,
      });

      const playlistId = playlist.body.id;

      if (tracks) {
        const tracksToAdd = tracks.map((track: any) => track.link);
        try {
          await spotifyApi.addTracksToPlaylist(playlistId, tracksToAdd);
        } catch (error) {
          return res
            .status(500)
            .json({ message: `Error adding tracks to playlist: ${error}` });
        }
      }

      return res.status(201).json({ message: "Playlist created", playlist });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating playlist: ${error}` });
    }
  },
};
