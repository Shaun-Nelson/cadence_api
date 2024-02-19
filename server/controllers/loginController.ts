const User = require("../models/User");
const SpotifyWebApi = require("spotify-web-api-node");
const { signToken } = require("../utils/auth");
const path = require("path");
require("dotenv").config(path.resolve(__dirname, "../../.env"));

module.exports = {
  authUser: async (req: any, res: any) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (user && (await user.isCorrectPassword(password))) {
        signToken(res, user);
        req.session.save(() => {
          req.session.user_id = user._id;
          req.session.logged_in = true;

          return res.status(200).send({ user });
        });
      } else {
        res.status(400).send({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error authenticating user" });
    }
  },
  isLoggedIn: (req: any, res: any) => {
    try {
      if (req.session.logged_in) {
        return res
          .status(200)
          .json({ logged_in: true, user_id: req.session.user_id });
      } else {
        return res.status(200).json({ logged_in: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error checking login status" });
    }
  },
  login: async (req: any, res: any) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
      });

      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }

      const valid = await user.isCorrectPassword(password);
      if (!valid) {
        return res.status(400).send({ message: "Invalid password" });
      }

      signToken(res, user);

      req.session.save(() => {
        req.session.user_id = user._id;
        req.session.logged_in = true;

        return res.status(200).send({ user });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message:
          "Error logging in. Please verify that your username and/or password is correct.",
      });
    }
  },
  loginSpotify: async (req: any, res: any) => {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    const scopes = ["user-read-private", "user-read-email"];
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

    res.status(200).redirect(authorizeURL);
  },
};
