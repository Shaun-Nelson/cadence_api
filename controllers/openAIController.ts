const OpenAI = require("openai");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

module.exports = {
  async openAI(req: any, res: any) {
    const MODEL = "gpt-4o";
    const TEMPERATURE = 0;
    const MAX_TOKENS = 3500;

    const openai = new OpenAI();
    const chat = {
      model: MODEL,
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
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
    };

    try {
      const chatCompletion = await openai.chat.completions.create(chat);
      const songs = JSON.parse(chatCompletion.choices[0].message.content);
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
      });

      await getSpotifyAccessToken(spotifyApi);

      await getSongsMetadata(songs, spotifyApi);

      res.status(200).send(getTracks(songs));
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
        res.status(500).send({ message: `OpenAI Error: ${error}` });
      }
    }
  },
};

const getSpotifyAccessToken = async (spotifyApi: any) => {
  const data = await spotifyApi.clientCredentialsGrant();
  const accessToken = data.body["access_token"];
  spotifyApi.setAccessToken(accessToken);
};

const getSongsMetadata = async (songs: any, spotifyApi: any) => {
  for (let song in songs) {
    const searchResults = await spotifyApi.searchTracks(
      songs[song].title + " " + songs[song].artist
    );

    songs[song].previewUrl = searchResults.body.tracks.items[0].preview_url;
    songs[song].image = searchResults.body.tracks.items[0].album.images[0].url;
    songs[song].uri = searchResults.body.tracks.items[0].uri;
    songs[song].artists = songs[song].artist.split(", ");
  }
};

const getTracks = (songs: any) => {
  let tracks = [];

  for (let song in songs) {
    tracks.push({
      title: songs[song].title,
      artists: songs[song].artists,
      duration: songs[song].duration,
      previewUrl: songs[song].previewUrl,
      link: songs[song].uri,
      image: songs[song].image,
    });
  }

  return tracks;
};
