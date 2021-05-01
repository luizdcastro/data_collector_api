const Sequileze = require('sequelize')
const dbConfig = require('./config')

const connectionSQL = new Sequileze(dbConfig)

module.exports = connectionSQL