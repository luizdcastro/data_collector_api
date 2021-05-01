const Price = require('../models/candle5Model');
const factoty = require('./../controllers/handlerFactory');

exports.getAllData = factoty.getAll(Price);
exports.createPrice = factoty.createOne(Price);