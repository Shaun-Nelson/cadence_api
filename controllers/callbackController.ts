const spotifyWebApi = require("spotify-web-api-node");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = {
  async callback(req: any, res: any) {
    const { code } = req.query;
    const spotifyApi = new spotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    try {
      const { accessToken, refreshToken } = await getSpotifyTokens(
        code,
        spotifyApi
      );
      setSpotifyTokens(accessToken, refreshToken, spotifyApi);
      setTokensCookies(accessToken, refreshToken, res);

      req.session.save(() => {
        req.session.access_token = accessToken;
        req.session.refresh_token = refreshToken;
        req.session.spotifyApi = spotifyApi;

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

const getSpotifyTokens = async (code: string, spotifyApi: any) => {
  const data = await spotifyApi.authorizationCodeGrant(code);
  const accessToken = data.body["access_token"];
  const refreshToken = data.body["refresh_token"];

  return { accessToken, refreshToken };
};

const setSpotifyTokens = (
  accessToken: string,
  refreshToken: string,
  spotifyApi: any
) => {
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);
};

const setTokensCookies = (
  accessToken: string,
  refreshToken: string,
  res: any
) => {
  res.cookie("access_token", accessToken);
  res.cookie("refresh_token", refreshToken);
};
