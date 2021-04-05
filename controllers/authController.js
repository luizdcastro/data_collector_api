const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(params = {}) {
	return jwt.sign(params, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
}

exports.register = async (req, res) => {
	const { name, phone, password, confirmPassword } = req.body

	if (password !== confirmPassword) {
		return res.status(400).send({ error: "Confirmação de senha inválida" });
	}

	if (password.length < 6) {
		return res.status(400).send({ error: "Senha deve conter no mínimo de 6 digitos" });
	}

	const userPhone = await User.findOne({ phone: req.body.phone });
	if (userPhone) {
		return res.status(400).send({ error: `Telefone ${phone} já cadastrado` });
	}

	let user;
	user = await User.create({
		name: req.body.name,
		phone: req.body.phone,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
	});
	user.password = undefined;

	res.status(201).json({
		status: "success",
		data: user,
		token: generateToken({ id: user.id }),
	});
};

exports.login = async (req, res, next) => {
	const { phone, password } = req.body;
	if (!phone || !password) {
		return res.status(400).send({ error: "Informe seu telefone e senha" });
	}

	const user = await User.findOne({ phone }).select("+password");

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).send({ error: "Seu telefone ou senha estão incorretos" });
	}

	user.password = undefined;

	res.status(200).json({
		status: "success",
		data: user,
		token: generateToken({ id: user.id }),
	});
};

exports.protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) return res.status(401).send({ error: "Token não informado" });

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).send({ error: "Token inválido" });
		req.userId = decoded.id;
	});

	next();
};