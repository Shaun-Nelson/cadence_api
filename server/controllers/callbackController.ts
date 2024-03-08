const spotifyWebApi = require("spotify-web-api-node");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = {
  //Spotify API callback
  async callback(req: any, res: any) {
    const { code } = req.query;
    const spotifyApi = new spotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    try {
      // Exchange code for access token
      const data = await spotifyApi.authorizationCodeGrant(code);
      const accessToken = data.body["access_token"];
      const refreshToken = data.body["refresh_token"];

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      res.cookie("access_token", accessToken);

      res.cookie("refresh_token", refreshToken);

      req.session.save(() => {
        //set the access token and refresh token as session variables
        req.session.access_token = accessToken;
        req.session.refresh_token = refreshToken;

        //set the spotifyApi object as a session variable
        req.session.spotifyApi = spotifyApi;

        //redirect to the home page
        return res.status(200).redirect(process.env.CLIENT_URL);
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Invalid Spotify token" })
        .redirect(process.env.CLIENT_URL);
    }
  },
};
