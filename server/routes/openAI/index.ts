const router = require("express").Router();
const { openAI } = require("../../controllers/openAIController");

// "/openai" route
router.route("/").post(openAI);

module.exports = router;
