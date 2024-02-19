const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    access_token: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    playlists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: any, next: any) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (
  this: any,
  password: string
) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
