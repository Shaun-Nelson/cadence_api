const router = require("express").Router();
const path = require("path");
const callbackRoutes = require("./callback");
const loginRoutes = require("./login");
const openAIRoutes = require("./openAI");
const signUpRoutes = require("./signUp");
const logoutRoutes = require("./logout");

router.use("/callback", callbackRoutes);
router.use("/login", loginRoutes);
router.use("/openai", openAIRoutes);
router.use("/signup", signUpRoutes);
router.use("/logout", logoutRoutes);

router.get("/", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../../client/index.html"));
});

module.exports = router;
