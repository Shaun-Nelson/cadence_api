import { link } from "fs";

const { Schema, model } = require("mongoose");

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
  },
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
  nextTracks: {
    type: Array,
  },
});

const Track = model("Track", trackSchema);

module.exports = Track;
