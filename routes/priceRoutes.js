const express = require("express");
const router = express.Router();
const priceController = require("../controllers/priceController");

router
    .route('/')
    .get(priceController.getAllData)
    .post(priceController.createPrice)

module.exports = router;