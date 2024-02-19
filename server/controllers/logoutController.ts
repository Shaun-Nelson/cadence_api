const User = require("../models/User");

module.exports = {
  logout: async function (req: any, res: any) {
    const user = await User.findOne({ _id: req.session.user_id });

    if (!req.session.logged_in) {
      return res.status(400).send({ message: "User not logged in" });
    }

    if (user) {
      res.clearCookie("connect.sid");
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      req.session.destroy();
      res.status(200).send({ message: "User logged out" });
    } else {
      res.status(400).send({ message: "User not found" });
    }
  },
};
