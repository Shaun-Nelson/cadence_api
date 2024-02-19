const jwt = require("jsonwebtoken");
const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const secret = process.env.JWT_SECRET;
const expiration = "14d";

interface userInterface {
  username: string;
  _id: string;
}

module.exports = {
  // This function will be used to sign a token
  signToken: function (res: any, { username, _id }: userInterface) {
    const payload = { username, _id };

    const token = jwt.sign({ data: payload }, secret, {
      expiresIn: expiration,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 14,
      sameSite: "strict",
    });
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
  // This middleware function will be used to check if the user is logged in
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
  protect: async function (req: any, res: any, next: any) {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, secret);

        req.user = await User.findById(decoded.data._id).select("-password"); // Here we are setting the user to the user found in the database by the id stored in the token
        next();
      } catch (error) {
        console.error(error);
        return res.status(401).send("Unauthorized. Invalid token.");
      }
    } else {
      return res.status(401).send("Unauthorized. No token provided.");
    }
  },
};
