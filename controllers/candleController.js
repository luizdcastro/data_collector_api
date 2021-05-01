const factoty = require('./../controllers/handlerFactory');
const Candle3 = require('../models/candle3Model');
const Candle5 = require('../models/candle5Model');
const Candle15 = require('../models/candle15Model');

exports.getAllCandle3 = factoty.getAll(Candle3);
exports.createCandle3 = factoty.createOne(Candle3);

exports.getAllCandle5 = factoty.getAll(Candle5);
exports.createCandle5 = factoty.createOne(Candle5);

exports.getAllCandle15 = factoty.getAll(Candle15);
exports.createCandle15 = factoty.createOne(Candle15);