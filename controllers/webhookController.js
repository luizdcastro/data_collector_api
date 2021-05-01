const dotenv = require("dotenv");
const Price = require('./../models/priceModel');
dotenv.config({ path: "./config.env" });

exports.price = async (req, res, next) => {

	const price = await req.body;

	const symbol = price.symbol
	const time = price.time
	const open = price.open
	const close = price.close.toFixed(2)
	const high = price.high.toFixed(2)
	const low = price.low.toFixed(2)
	const volume = price.volume.toFixed(2)
	const rsi = price.rsi.toFixed(2)
	const stochastic_k = price.stochastic_k.toFixed(2)
	const stochastic_d = price.stochastic_d.toFixed(2)
	const macd = price.macd.toFixed(2)
	const macd_signal = price.macd_signal.toFixed(2)
	const ema_200 = price.ema_200
	const ema_150 = price.ema_150
	const ema_100 = price.ema_100
	const ema_50 = price.ema_50
	const ema_20 = price.ema_20
	const adx = price.adx.toFixed(2)
	const osc = price.osc.toFixed(2)
	const atr = price.atr.toFixed(2)
	const vwap = price.vwap.toFixed(2)

	await Price.create(
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