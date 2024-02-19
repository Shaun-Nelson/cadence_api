const User = require("../models");
const SpotifyWebApi = require("spotify-web-api-node");
const { signToken } = require("../utils/auth");
const path = require("path");
require("dotenv").config(path.resolve(__dirname, "../../.env"));

module.exports = {
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
      const user = await User.findOne({
        username: req.body.username,
        email: req.body.email,
      });

      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }

      const valid = await user.validPassword(req.body.password);
      if (!valid) {
        return res.status(400).send({ message: "Invalid password" });
      }

      const token = signToken(user);

      req.session.save(() => {
        req.session.user_id = user._id;
        req.session.logged_in = true;
      });
      res.status(200).send({ token, user });
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
