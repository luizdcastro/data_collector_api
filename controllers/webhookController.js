const ccxt = require('ccxt');
const dotenv = require("dotenv");
const axios = require('axios');

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
		const stochasticK = price.stochasticK.toFixed(2)
		const stochasticD = price.stochasticD.toFixed(2)
		const macd = price.macd.toFixed(2)
		const macdSignal = price.macdSignal.toFixed(2)
		const ema = price.ema
		const adx = price.adx.toFixed(2)
		const osc = price.osc.toFixed(2)

	axios({
		method: 'post',
		url: 'https://mambit.herokuapp.com/v1/price',
		data: {
			"symbol": symbol,
			"time": time,
			"open": open,
			"close": close,
			"high": high,
			"low": low,
			"volume": volume,
			"rsi": rsi,
			"stochasticK": stochasticK,
			"stochasticD": stochasticD,
			"macd": macd,
			"macdSignal": macdSignal,
			"ema": ema,
			"adx": adx,
			"osc": osc
		}
	})
		.catch(function (error) {
			console.log(error);
		});

	res.status(200).json({
		status: "success",
	});
}

dotenv.config({ path: "./config.env" });

const exchange = new ccxt.bybit({
	apiKey: process.env.API_KEY,
	secret: process.env.API_SECRET,
	enableRateLimit: true,
	urls: {
		'api': 'https://api-testnet.bybit.com'
	},
})

exports.signal = async (req, res, next) => {
	const { signal } = req.body;

	const cripto_symbol = "ETH/USDT"
	const leverage = 3
	const capital = 1.1

	if (signal === "Long" || "Short") {

		// order size
		let bid_price = await exchange.fetchTicker(cripto_symbol)
		let balance = await exchange.fetchBalance()
		let order_size = ((balance.USDT.free / capital) / bid_price.bid * leverage).toFixed(3)

		// verify open orders and sizes
		let open_orders = await exchange.fetchPositions(cripto_symbol, { "type": "linear" })
		let side_short = await open_orders.filter((item) => item.data.symbol === "ETHUSDT" && item.data.side === "Sell")
		let side_long = await open_orders.filter((item) => item.data.symbol === "ETHUSDT" && item.data.side === "Buy")
		let short_entry = side_short[0].data.entry_price
		let long_entry = side_long[0].data.entry_price
		let short_size = side_short[0].data.size
		let long_size = side_long[0].data.size

		// Open the first ordem with long position
		if (signal === "Long" & short_entry === "0" & long_entry === "0") {
			exchange.createOrder(cripto_symbol, 'market', 'Buy', Number(order_size))
		}

		// Open the first ordem with short position
		if (signal === "Short" & short_entry === "0" & long_entry === "0") {
			exchange.createOrder(cripto_symbol, 'market', 'Sell', Number(order_size))
		}

		if (signal === "Long" & long_entry === "0" & short_entry !== "0") {
			// Close current short order
			await exchange.createMarketBuyOrder(cripto_symbol, Number(short_size), { 'reduce_only': true })
			// Reset order size
			let bid_price = await exchange.fetchTicker(cripto_symbol)
			let balance = await exchange.fetchBalance()
			let order_size = ((balance.USDT.free / capital) / bid_price.bid * leverage).toFixed(3)
			// Open long at market price		
			exchange.createOrder(cripto_symbol, 'market', 'Buy', Number(order_size))
		}
		if (signal === "Short" & long_entry !== "0" & short_entry === "0") {
			// Close current long order	
			await exchange.createMarketSellOrder(cripto_symbol, Number(long_size), { 'reduce_only': true })
			// Reset order size
			let bid_price = await exchange.fetchTicker(cripto_symbol)
			let balance = await exchange.fetchBalance()
			let order_size = ((balance.USDT.free / capital) / bid_price.bid * leverage).toFixed(3)
			// Open short at market price 
			exchange.createOrder(cripto_symbol, 'market', 'Sell', Number(order_size))
		}
	} else {
		console.log('Sinal inválidos')
	}

	res.status(200).json({
		status: "success",
	});
}