const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{	
		symbol: {
			type: String,
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

module.exports = mongoose.model("Price", userSchema);