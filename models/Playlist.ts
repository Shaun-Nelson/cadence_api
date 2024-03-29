const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tracks: [
    {
      title: {
        type: String,
      },
      artists: [
        {
          type: String,
        },
      ],
      duration: {
        type: String,
      },
      previewUrl: {
        type: String,
      },
      link: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
  link: {
    type: String,
  },
  username: {
    type: String,
    ref: "User",
  },
});

playlistSchema.virtual("trackCount").get(function (this: any) {
  return this.tracks ? this.tracks.length : 0;
});

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
