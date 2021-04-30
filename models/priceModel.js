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
		stochasticK: {
			type: Number,		
		},
		stochasticD: {
			type: Number,
		},
		macd: {
			type: Number,
		},
		macdSignal: {
			type: Number,
        },
        ema150: {
			type: Number,
		},
		ema100: {
			type: Number,
		},
		ema50: {
			type: Number,
		},
		adx: {
			type: Number,
		},
		osc: {
			type: Number,
        },	
		
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

module.exports = mongoose.model("Price", userSchema);