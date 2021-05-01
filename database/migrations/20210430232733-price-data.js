'use strict';

const { STRING } = require("sequelize/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eth_candle_5', {
      id: {
        type: Sequelize.INTEGER,
        primayKey: true,
        autoIncrement: true,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      symbol: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.DATE
      },
      open: {
        type: Sequelize.FLOAT,
      },
      close: {
        type: Sequelize.FLOAT,
      },
      high: {
        type: Sequelize.FLOAT,
      },
      low: {
        type: Sequelize.FLOAT,
      },
      volume: {
        type: Sequelize.FLOAT,
      },
      rsi: {
        type: Sequelize.FLOAT,
      },
      stochastic_k: {
        type: Sequelize.FLOAT,
      },
      stochastic_d: {
        type: Sequelize.FLOAT,
      },
      macd: {
        type: Sequelize.FLOAT,
      },
      macd_signal: {
        type: Sequelize.FLOAT,
      },
      ema_200: {
        type: Sequelize.INTEGER,
      },
      ema_150: {
        type: Sequelize.INTEGER,
      },
      ema_100: {
        type: Sequelize.INTEGER,
      },
      ema_50: {
        type: Sequelize.INTEGER,
      },
      ema_20: {
        type: Sequelize.INTEGER,
      },
      adx: {
        type: Sequelize.FLOAT,
      },
      osc: {
        type: Sequelize.FLOAT,
      },
      vwap: {
        type: Sequelize.INTEGER,
      },
      atr: {
        type: Sequelize.FLOAT,
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('eth_candle_5');
  }
};
