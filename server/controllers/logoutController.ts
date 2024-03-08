const User = require("../models/User");

module.exports = {
  logout: async function (req: any, res: any) {
    try {
      const user = await User.findOne({ _id: req.session.user_id });

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
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error logging out user" });
    }
  },
};
