const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const secret = process.env.JWT_SECRET;
const expiration = "2h";

interface userInterface {
  username: string;
  email: string;
  _id: string;
}

module.exports = {
  // This function will be used to sign a token
  signToken: function ({ username, email, _id }: userInterface) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // This function will be used to verify a token
  getUser: function (token: string) {
    try {
      if (!token) {
        return null;
      }
      return jwt.verify(token, secret);
    } catch {
      console.log("Invalid token");
      return null;
    }
  },
  isLoggedIn: function (req: any, res: any, next: any) {
    if (req.session.logged_in) {
      next();
    }
    res.status(401).send("Unauthorized");
  },
  // This middleware function will be used to authenticate users and grant access to the application.
  authMiddleware: function ({ req }: { req: any }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
};
