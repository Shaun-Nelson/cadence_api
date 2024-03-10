const OpenAI = require("openai");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

module.exports = {
  // OpenAI API
  async openAI(req: any, res: any) {
    const openai = new OpenAI();

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an assistant that only responds in JSON.
      Create a list of ${req.body.length} unique songs based off the following
      statement: "${req.body.input}". Include "id", "title", "artist", "album", and "duration"
      in your response. An example response is: "
      [
        {
            "id": 1,
            "title": "Hey Jude",
            "artist": "The Beatles",
            "album": "The Beatles (White Album)",
            "duration": "4:56"
        }
      ]
      ".`,
          },
        ],
        temperature: 0,
        max_tokens: 3500,
      });

      // Parse the JSON response, get the songs array
      const songs = JSON.parse(chatCompletion.choices[0].message.content);

      // If the Spotify API is not already authorized, authorize it
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
      });

      //get access token
      const data = await spotifyApi.clientCredentialsGrant();
      const accessToken = data.body["access_token"];
      spotifyApi.setAccessToken(accessToken);

      // iterate through the songs and add the preview url, image, and uri of each song
      for (let song in songs) {
        const searchResults = await spotifyApi.searchTracks(
          songs[song].title + " " + songs[song].artist
        );

        songs[song].previewUrl = searchResults.body.tracks.items[0].preview_url;

        songs[song].image =
          searchResults.body.tracks.items[0].album.images[0].url;

        songs[song].uri = searchResults.body.tracks.items[0].uri;

        //get artists as an array
        songs[song].artists = songs[song].artist.split(",");
      }

      let results = [];

      // iterate through the songs and create a new array of Track objects
      for (let song in songs) {
        results.push({
          title: songs[song].title,
          artists: songs[song].artists,
          duration: songs[song].duration,
          previewUrl: songs[song].previewUrl,
          link: songs[song].uri,
          image: songs[song].image,
        });
      }

      res.status(200).send(results);
    } catch (error) {
      if ((error as any).response) {
        console.log((error as any).response.data);
        console.log((error as any).response.status);
        console.log((error as any).response.headers);
        res.status(500).send({ message: "Invalid OpenAI token" });
      } else if ((error as any).request) {
        console.log((error as any).request);
        res.status(500).send({ message: "Invalid OpenAI token" });
      } else {
        console.error("Error", error);
        res.status(500).send({ message: "Invalid OpenAI token" });
      }
    }
  },
};
