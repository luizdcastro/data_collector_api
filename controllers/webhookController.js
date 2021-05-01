const dotenv = require("dotenv");
const Candle3 = require('../models/candle3Model');
const Candle5 = require('../models/candle5Model');
const Candle15 = require('../models/candle15Model');

dotenv.config({ path: "./config.env" });

exports.candle3 = async (req, res, next) => {

	const candle_3 = await req.body;

	const symbol = candle_3.symbol
	const time = candle_3.time
	const open = candle_3.open
	const close = candle_3.close.toFixed(2)
	const high = candle_3.high.toFixed(2)
	const low = candle_3.low.toFixed(2)
	const volume = candle_3.volume.toFixed(2)
	const rsi = candle_3.rsi.toFixed(2)
	const stochastic_k = candle_3.stochastic_k.toFixed(2)
	const stochastic_d = candle_3.stochastic_d.toFixed(2)
	const macd = candle_3.macd.toFixed(2)
	const macd_signal = candle_3.macd_signal.toFixed(2)
	const ema_200 = candle_3.ema_200
	const ema_150 = candle_3.ema_150
	const ema_100 = candle_3.ema_100
	const ema_50 = candle_3.ema_50
	const ema_20 = candle_3.ema_20
	const adx = candle_3.adx.toFixed(2)
	const osc = candle_3.osc.toFixed(2)
	const atr = candle_3.atr.toFixed(2)
	const vwap = candle_3.vwap.toFixed(2)

	await Candle3.create(
		{
			"symbol": symbol,
			"time": time,
			"open": open,
			"close": close,
			"high": high,
			"low": low,
			"volume": volume,
			"rsi": rsi,
			"stochastic_k": stochastic_k,
			"stochastic_d": stochastic_d,
			"macd": macd,
			"macd_signal": macd_signal,
			"ema_200": ema_200,
			"ema_150": ema_150,
			"ema_100": ema_100,
			"ema_50": ema_50,
			"ema_20": ema_20,
			"adx": adx,
			"osc": osc,
			"atr": atr,
			"vwap": vwap,
		}
	)
	res.status(200).json({
		status: "success",
	});
}

exports.candle5 = async (req, res, next) => {

	const candle_5 = await req.body;

	const symbol = candle_5.symbol
	const time = candle_5.time
	const open = candle_5.open
	const close = candle_5.close.toFixed(2)
	const high = candle_5.high.toFixed(2)
	const low = candle_5.low.toFixed(2)
	const volume = candle_5.volume.toFixed(2)
	const rsi = candle_5.rsi.toFixed(2)
	const stochastic_k = candle_5.stochastic_k.toFixed(2)
	const stochastic_d = candle_5.stochastic_d.toFixed(2)
	const macd = candle_5.macd.toFixed(2)
	const macd_signal = candle_5.macd_signal.toFixed(2)
	const ema_200 = candle_5.ema_200
	const ema_150 = candle_5.ema_150
	const ema_100 = candle_5.ema_100
	const ema_50 = candle_5.ema_50
	const ema_20 = candle_5.ema_20
	const adx = candle_5.adx.toFixed(2)
	const osc = candle_5.osc.toFixed(2)
	const atr = candle_5.atr.toFixed(2)
	const vwap = candle_5.vwap.toFixed(2)

	await Candle5.create(
		{
			"symbol": symbol,
			"time": time,
			"open": open,
			"close": close,
			"high": high,
			"low": low,
			"volume": volume,
			"rsi": rsi,
			"stochastic_k": stochastic_k,
			"stochastic_d": stochastic_d,
			"macd": macd,
			"macd_signal": macd_signal,
			"ema_200": ema_200,
			"ema_150": ema_150,
			"ema_100": ema_100,
			"ema_50": ema_50,
			"ema_20": ema_20,
			"adx": adx,
			"osc": osc,
			"atr": atr,
			"vwap": vwap,
		}
	)
	res.status(200).json({
		status: "success",
	});
}

exports.candle15 = async (req, res, next) => {

	const candle_15 = await req.body;

	const symbol = candle_15.symbol
	const time = candle_15.time
	const open = candle_15.open
	const close = candle_15.close.toFixed(2)
	const high = candle_15.high.toFixed(2)
	const low = candle_15.low.toFixed(2)
	const volume = candle_15.volume.toFixed(2)
	const rsi = candle_15.rsi.toFixed(2)
	const stochastic_k = candle_15.stochastic_k.toFixed(2)
	const stochastic_d = candle_15.stochastic_d.toFixed(2)
	const macd = candle_15.macd.toFixed(2)
	const macd_signal = candle_15.macd_signal.toFixed(2)
	const ema_200 = candle_15.ema_200
	const ema_150 = candle_15.ema_150
	const ema_100 = candle_15.ema_100
	const ema_50 = candle_15.ema_50
	const ema_20 = candle_15.ema_20
	const adx = candle_15.adx.toFixed(2)
	const osc = candle_15.osc.toFixed(2)
	const atr = candle_15.atr.toFixed(2)
	const vwap = candle_15.vwap.toFixed(2)

	await Candle15.create(
		{
			"symbol": symbol,
			"time": time,
			"open": open,
			"close": close,
			"high": high,
			"low": low,
			"volume": volume,
			"rsi": rsi,
			"stochastic_k": stochastic_k,
			"stochastic_d": stochastic_d,
			"macd": macd,
			"macd_signal": macd_signal,
			"ema_200": ema_200,
			"ema_150": ema_150,
			"ema_100": ema_100,
			"ema_50": ema_50,
			"ema_20": ema_20,
			"adx": adx,
			"osc": osc,
			"atr": atr,
			"vwap": vwap,
		}
	)
	res.status(200).json({
		status: "success",
	});
}