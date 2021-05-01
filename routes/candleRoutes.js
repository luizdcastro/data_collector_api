const express = require("express");
const router = express.Router();
const candleController = require("../controllers/candleController");

router
    .route('/3')
    .get(candleController.getAllCandle3)
    .post(candleController.createCandle3)

router
    .route('/5')
    .get(candleController.getAllCandle5)
    .post(candleController.createCandle5)

router
    .route('/15')
    .get(candleController.getAllCandle15)
    .post(candleController.createCandle15)

module.exports = router;