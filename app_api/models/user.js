var mongoose = require('mongoose');
// Use crypto to generate the random values for password
var crypto = require('crypto');
// Use the jwt to encode database 
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    _id:{type: String, unique:true, dropDups:true},
    type:Number,
    password:String,
	created_at: Date,
	hash:String,
	salt:String
});

/**
 * 
 * @param {*} password 
 * 
 * Use crypto module to hash password 
 */
userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
}

/**
 * 
 * @param {*} password 
 * 
 * Hash password and compare it to current usr password
 */
userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha1').toString('hex');
	return this.hash === hash;
}
/**
 * 
 * Generate a custom jwt token using user data 
 */
userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		type: this.type,
		exp: parseInt(expiry.getTime()/1000)
	}, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User',userSchema);