const express = require("express");
const db = require("./config/connection");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();
const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production", //secure is true in production
  },
  store: MongoStore.create({
    mongoUrl:
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI
        : "mongodb://localhost:27017/cadence_db",
  }),
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(session(sess));
app.use("/api", routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
