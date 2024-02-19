const router = require("express").Router();
const { openAI } = require("../../controllers/openAIController");
const { authMiddleware } = require("../../utils/auth");

// "/openai" route
router.route("/").post(openAI);

module.exports = router;
