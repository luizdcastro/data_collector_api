const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

router.post("/signal", webhookController.signal);
router.post("/price", webhookController.price);

module.exports = router;