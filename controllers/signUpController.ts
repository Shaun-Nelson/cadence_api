const User = require("../models/User");
const { signToken } = require("../utils/auth");

module.exports = {
  signUpUser: async function (req: any, res: any) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await User.create({ username, password });

      signToken(res, user);

      req.session.save(() => {
        req.session.user_id = user._id;
        req.session.logged_in = true;

        return res.status(200).json({ user });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: `Error creating user: ${error}` });
    }
  },
  updateUser: async function (req: any, res: any) {
    try {
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { password: req.body.password },
        { new: true }
      );

      signToken(res, user);

      req.session.save(() => {
        req.session.user_id = user._id;
        req.session.logged_in = true;

        return res.status(200).send({ user });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: `Error updating user: ${error}` });
    }
  },
  deleteUser: async function (req: any, res: any) {
    try {
      const user = await User.findOneAndDelete({
        username: req.body.username,
        password: req.body.password,
      });

      req.session.destroy();

      return res.status(200).send({ message: "User deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: `Error deleting user: ${error}` });
    }
  },
};
