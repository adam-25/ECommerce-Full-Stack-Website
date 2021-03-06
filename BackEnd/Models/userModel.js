/* 	
	File: User Information.
	Date: May 8, 2022.
		* Schema of the user Information when they create an Account.

	Date: May 10, 2022.
		* Added resetPassword method which returns the token that we want to send via email.
*/

// Importing necessary files for route.
const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const saltRounds = 10;


const userSchema = new mongoose.Schema({
	userFullName: {
		type: String,
		required: [true, "Please Enter Your Name"],
	},
	userFirstName: {
		type: String,
		required: [true, "Please Enter Your First Name"]
	},
	userLastName: {
		type: String,
		required: [true, "Please Enter Your Last Name"]
	},
	userEmail: {
		type: String,
		required: [true, "Please Enter Your Email"],
		unique: true,
		validate: [validate.isEmail, "Please Enter Valid Email"],
	},
	userPassword: {
		type: String,
		required: [true, "Please Enter Your Password"],
		minLength: [6, "Password must be at least 6 characters"],
		select: false
	},
	userRole: {
		type: String,
		default: "user"
	},
	resetPasswordToken: String,

	resetPasswordExpiredDate: Date
});

// Hashing the password and store in DB.
userSchema.pre("save", async function (next) {

	if (!this.isModified("userPassword")) {
		next();
	}

	this.userPassword = await bcrypt.hash(this.userPassword, saltRounds);
});

// JWT Token We store it in Cookie so, we can know that this is the same user that has been logged in.
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.SECRET_KEY,
		{ expiresIn: process.env.JWT_EXPIRE }
	);
};

// Compare the user Entered password and hashed password stored in the database.
userSchema.methods.comparePassword = async function (plainPassword) {

	return await bcrypt.compare(plainPassword, this.userPassword);

};

// Return reset Password Token from the database.
userSchema.methods.resetPassword = async function () {

	const resetToken = crypto.randomBytes(20).toString("hex");

	this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	this.resetPasswordExpiredDate = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

module.exports = new mongoose.model("userInfo", userSchema);