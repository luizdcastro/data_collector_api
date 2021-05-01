
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

//Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.enable('trust proxy')

//Import Routes
const candleRouter = require('./routes/candleRoutes');
const webhookRouter = require('./routes/webhookRoutes');

//Connect to Mongo DB
dotenv.config({ path: "./config.env" });

mongoose
	.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB connection successful!"));

//Route Middlewares
app.use("/candle", candleRouter);
app.use("/webhook", webhookRouter);

//Server
//Server
const port = 8000;
app.listen(process.env.PORT || port, () =>
	console.log(`Running on port ${port}`)
);