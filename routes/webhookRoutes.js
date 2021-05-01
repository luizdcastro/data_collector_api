const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

router.post("/3", webhookController.candle3);
router.post("/5", webhookController.candle5);
router.post("/15", webhookController.candle15);

module.exports = router;