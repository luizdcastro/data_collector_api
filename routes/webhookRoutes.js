const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

router.post("/signal", webhookController.signal);

module.exports = router;