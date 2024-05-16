import { callback } from "../controllers/callbackController";
import {
  getSpotifyTokens,
  setSpotifyTokens,
  setTokensCookies,
} from "../controllers/callbackController";

describe("callbackController", () => {
  describe("callback", () => {
    it("should call getSpotifyTokens and setTokensCookies functions", async () => {
      const req = {}; // Mock request object
      const res = {}; // Mock response object

      const getSpotifyTokensMock = jest.spyOn(
        callbackController,
        "getSpotifyTokens"
      );
      const setTokensCookiesMock = jest.spyOn(
        callbackController,
        "setTokensCookies"
      );

      await callback(req, res);

      expect(getSpotifyTokensMock).toHaveBeenCalled();
      expect(setTokensCookiesMock).toHaveBeenCalled();
    });
  });

  describe("getSpotifyTokens", () => {
    it("should return the Spotify access token and refresh token", async () => {
      const code = "SOME_AUTHORIZATION_CODE";
      const spotifyApi = {}; // Mock Spotify API object

      const tokens = await getSpotifyTokens(code, spotifyApi);

      expect(tokens).toHaveProperty("accessToken");
      expect(tokens).toHaveProperty("refreshToken");
    });
  });

  describe("setSpotifyTokens", () => {
    it("should set the Spotify access token and refresh token", () => {
      const accessToken = "SOME_ACCESS_TOKEN";
      const refreshToken = "SOME_REFRESH_TOKEN";
      const spotifyApi = {}; // Mock Spotify API object

      setSpotifyTokens(accessToken, refreshToken, spotifyApi);

      expect(spotifyApi.setAccessToken).toHaveBeenCalledWith(accessToken);
      expect(spotifyApi.setRefreshToken).toHaveBeenCalledWith(refreshToken);
    });
  });

  describe("setTokensCookies", () => {
    it("should set the access token and refresh token as cookies in the response", () => {
      const accessToken = "SOME_ACCESS_TOKEN";
      const refreshToken = "SOME_REFRESH_TOKEN";
      const res = {}; // Mock response object

      setTokensCookies(accessToken, refreshToken, res);

      expect(res.cookie).toHaveBeenCalledWith("accessToken", accessToken);
      expect(res.cookie).toHaveBeenCalledWith("refreshToken", refreshToken);
    });
  });
});
