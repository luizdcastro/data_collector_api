const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const candle15Schema = new mongoose.Schema(
	{			
		symbol: {
			type: String,
		},	
		candle_time: {
			type: Number,
			default: 15
		},
		time: {
			type: Date,
		},
		open: {
			type: Number,			
		},
		close: {
			type: Number,		
		},
		high: {
			type: Number,		
		},
		low: {
			type: Number,
		},
		volume: {
			type: Number,
		},
		rsi: {
			type: Number,	
		},
		stochastic_k: {
			type: Number,		
		},
		stochastic_d: {
			type: Number,
		},
		macd: {
			type: Number,
		},
		macd_signal: {
			type: Number,
        },
		ema_200: {
			type: Number,
		},
        ema_150: {
			type: Number,
		},
		ema_100: {
			type: Number,
		},
		ema50: {
			type: Number,
		},
		ema_20: {
			type: Number,
		},
		adx: {
			type: Number,
		},
		osc: {
			type: Number,
        },	
		vwap: {
			type: Number,
        },	
		atr: {
			type: Number,
        },		
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

candle15Schema.plugin(AutoIncrement, {inc_field: 'id_sequence_15'});

module.exports = mongoose.model("Candle_15", candle15Schema);