const User = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
  signUpUser: async function (req: any, res: any) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.create({ username, password });

    if (!user) {
      return res.status(400).send({
        message: "Please provide a different username and/or password.",
      });
    }

    const token = signToken(user);

    req.session.save(() => {
      req.session.user_id = user._id;
      req.session.logged_in = true;
    });
    res.status(200).send({ token, user });
  },
  updateUser: async function (req: any, res: any) {
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { password: req.body.password },
      { new: true }
    );

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const token = signToken(user);

    req.session.save(() => {
      req.session.user_id = user._id;
      req.session.logged_in = true;
    });
    res.status(200).send({ token, user });
  },
  deleteUser: async function (req: any, res: any) {
    const user = await User.findOneAndDelete({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    req.session.destroy();
    res.status(200).send({ message: "User deleted" });
  },
};
