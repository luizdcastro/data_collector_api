const Price = require('../models/priceModel');
const factoty = require('./../controllers/handlerFactory');

exports.getAllData = factoty.getAll(Price);
exports.createPrice = factoty.createOne(Price);