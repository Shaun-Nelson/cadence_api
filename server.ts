const express = require("express");
const db = require("./config/connection");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
require("dotenv").config();

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
    mongoUrl: process.env.MONGODB_URI,
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
app.use(cookieParser());
app.use(session(sess));
app.use("/api", routes);

// if (process.env.NODE_ENV === "production") {
//   app.set("trust proxy", 1); // trust first proxy for secure cookies
//   app.use(express.static(path.join(__dirname, "../client/build")));
//   app.get("*", (req: Request, res: any) => {
//     res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//   });
// }

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
