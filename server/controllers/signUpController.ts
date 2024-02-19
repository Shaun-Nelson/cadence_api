const User = require("../models/User");
const { signToken } = require("../utils/auth");

module.exports = {
  signUpUser: async function (req: any, res: any) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await User.create({ username, password });

      if (!user) {
        return res.status(400).send({
          message: "Please provide a different username and/or password.",
        });
      }

      signToken(res, user);

      req.session.save(() => {
        req.session.user_id = user._id;
        req.session.logged_in = true;

        return res.status(200).send({ user });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error creating user" });
    }
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

    signToken(res, user);

    req.session.save(() => {
      req.session.user_id = user._id;
      req.session.logged_in = true;

      return res.status(200).send({ user });
    });
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
