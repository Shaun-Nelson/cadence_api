const express = require("express");
const db = require("./config/connection");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3001;
const app = express();

//Set up express app to use sessions
const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production", //secure is true in production
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/cadence_db",
  }),
};

const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 14, //14 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sess));
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy for secure cookies
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req: Request, res: any) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
