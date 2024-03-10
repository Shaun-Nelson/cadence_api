const User = require("../models/User");
const { signToken } = require("../utils/auth");

module.exports = {
  getUserProfile: async function (req: any, res: any) {
    console.log(req.user);
    const user = {
      _id: req.user._id,
      username: req.user.username,
    };

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    return res.status(200).json({ user });
  },
  updateUserProfile: async function (req: any, res: any) {
    try {
      const user = await User.findById(req.user._id);

      if (user) {
        user.username = req.body.username || user.username;

        if (req.body.password) {
          user.password = req.body.password;
        }

        const updatedUser = await user.save();

        return res.status(200).json({
          _id: updatedUser._id,
          username: updatedUser.username,
        });
      } else {
        return res.status(400).send({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error updating user" });
    }
  },
};
