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
        ema: {
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

userSchema.pre("save", async function (next) {
	this.open = this.open.toFixed(2);
	this.close = this.close.toFixed(2);
	this.high = this.high.toFixed(2);
	this.low = this.low.toFixed(2);
	this.volume = this.volume.toFixed(2);
	this.rsi = this.rsi.toFixed(2);
	this.stochasticK = this.stochasticK.toFixed(2);
	this.stochasticD = this.stochasticD.toFixed(2);
	this.macd = this.macd.toFixed(2);
	this.macdSignal = this.macdSignal.toFixed(2);
	this.adx = this.adx.toFixed(2);
	this.osc = this.osc.toFixed(2);
});

module.exports = mongoose.model("Price", userSchema);