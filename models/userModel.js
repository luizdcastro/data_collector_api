const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
	{	
		name: {
			type: String,
			required: [true, "Por favor, informe seu nome"],
		},	
		phone: {
			type: String,
			required: [true, "Por favor, informe seu telefone"],
		},
		leverage: {
			type: String,			
		},
		take_profit: {
			type: Number,		
		},
		crypto: {
			type: String,		
		},
		api_key: {
			type: String
		},
		api_secret: {
			type: String
		},
		password: {
			type: String,
			required: [true, "Por favor, informe sua senha"],
			select: false,
			minlength: 6,
		},
		confirmPassword: {
			type: String,
			required: [true, "Por favor, informe sua senha"],
			select: false,
			minlength: 6,
		},		
		createdAt: {
			type: Date,
			default: Date.now,
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	this.confirmPassword = undefined;
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimesStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimesStamp;
	}
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model("Users", userSchema);