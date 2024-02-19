module.exports = {
  logout: async function (req: any, res: any) {
    req.session.destroy();
    res.status(200).send({ message: "User logged out" });
  },
};
