const ccxt = require('ccxt')
const dotenv = require("dotenv");

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

	const cripto_symbol = "BTC/USDT"
	const take_profit = 200
	const leverage = 8
	const capital = 1.1

	if (signal === "Long" || "Short") {

		// order size
		let bid_price = await exchange.fetchTicker(cripto_symbol)
		let balance = await exchange.fetchBalance()
		let order_size = ((balance.USDT.free / capital) / bid_price.bid * leverage).toFixed(3)

		// verify open orders and sizes
		let open_orders = await exchange.fetchPositions(cripto_symbol, { "type": "linear" })
		let side_short = await open_orders.filter((item) => item.data.symbol === "BTCUSDT" && item.data.side === "Sell")
		let side_long = await open_orders.filter((item) => item.data.symbol === "BTCUSDT" && item.data.side === "Buy")
		let short_entry = side_short[0].data.entry_price
		let long_entry = side_long[0].data.entry_price
		let short_size = side_short[0].data.size
		let long_size = side_long[0].data.size

		// Open the first ordem with long position
		if (signal === "Long" & short_entry === "0" & long_entry === "0") {
			exchange.createOrder(cripto_symbol, 'market', 'Buy', Number(order_size))
			let open_orders = await exchange.fetchPositions(cripto_symbol, { "type": "linear" })
			let side_long = await open_orders.filter((item) => item.data.symbol === "BTCUSDT" && item.data.side === "Buy")
			let limit_price = Number(side_long[0].data.entry_price) + take_profit
			let limit_qty = Number(side_long[0].data.size)
			exchange.createOrder(cripto_symbol, 'limit', 'Sell', limit_qty, limit_price, { 'reduce_only': true })
		}

		// Open the first ordem with short position
		if (signal === "Short" & short_entry === "0" & long_entry === "0") {
			exchange.createOrder(cripto_symbol, 'market', 'Sell', Number(order_size))
			let open_orders = await exchange.fetchPositions(cripto_symbol, { "type": "linear" })
			let side_long = await open_orders.filter((item) => item.data.symbol === "BTCUSDT" && item.data.side === "Sell")
			let limit_price = Number(side_long[0].data.entry_price) - take_profit
			let limit_qty = Number(side_long[0].data.size)
			exchange.createOrder(cripto_symbol, 'limit', 'Buy', limit_qty, limit_price, { 'reduce_only': true })
		}

		if (signal === "Long" & long_entry === "0" & short_entry !== "0") {
			// Close short at market price and cancel active limit orders
			exchange.cancelAllOrders(cripto_symbol)
			exchange.createMarketBuyOrder(cripto_symbol, Number(short_size), { 'reduce_only': true })
			let bid_price = await exchange.fetchTicker(cripto_symbol)
			let balance = await exchange.fetchBalance()
			let order_size = ((balance.USDT.free / capital) / bid_price.bid * leverage).toFixed(3)

			// Opem long at market price and open limit order
			exchange.createOrder(cripto_symbol, 'market', 'Buy', Number(order_size))
			let open_orders = await exchange.fetchPositions(cripto_symbol, { "type": "linear" })
			let side_long = await open_orders.filter((item) => item.data.symbol === "BTCUSDT" && item.data.side === "Buy")
			let limit_price = Number(side_long[0].data.entry_price) + take_profit
			let limit_qty = Number(side_long[0].data.size)
			exchange.createOrder(cripto_symbol, 'limit', 'Sell', limit_qty, limit_price, { 'reduce_only': true })
		}

		if (signal === "Short" & long_entry !== "0" & short_entry === "0") {
			// Close long at market price and cancel active limit orders
			await exchange.cancelAllOrders(cripto_symbol)
			await exchange.createMarketSellOrder(cripto_symbol, Number(long_size), { 'reduce_only': true })
			let bid_price = await exchange.fetchTicker(cripto_symbol)
			let balance = await exchange.fetchBalance()
			let order_size = ((balance.USDT.free / capital) / bid_price.bid * leverage).toFixed(3)

			// Opem short at market price and open limit order
			await exchange.createOrder(cripto_symbol, 'market', 'Sell', Number(order_size))
			let open_orders = await exchange.fetchPositions(cripto_symbol, { "type": "linear" })
			let side_long = await open_orders.filter((item) => item.data.symbol === "BTCUSDT" && item.data.side === "Sell")
			let limit_price = Number(side_long[0].data.entry_price) - take_profit
			let limit_qty = Number(side_long[0].data.size)
			await exchange.createOrder(cripto_symbol, 'limit', 'Buy', limit_qty, limit_price, { 'reduce_only': true })
		}
	} else {
		console.log('Sinal inválidos')
	}

	res.status(200).json({
		status: "success",
	});
}