
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

//Import Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require('./routes/userRoutes');
const priceRouter = require('./routes/priceRoutes');
const webhookRouter = require('./routes/webhookRoutes');

//Connect to DB
dotenv.config({ path: "./config.env" });

mongoose
	.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("DB connection successful!"));

//Route Middlewares
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/price", priceRouter);
app.use("/v1/webhook", webhookRouter);

//Server
const port = 8000;
app.listen(process.env.PORT || port, () =>
	console.log(`Running on port ${port}`)
);