var mongoose = require("mongoose");

// User Schema
var userSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: String,
	email: {
		type: String,
		required: true
	},
	center_id: {
		type: String,
		required: true
	},
	password: String,
	nationality: String,
	phone: String,
	location: String,
	avatar: String,
	create_date: {
		type: Date,
		default: Date.now
	}
});

var user = module.exports = mongoose.model("User", userSchema);

// Get Users
module.exports.getUsers = function(callback, limit) {
	User.find(callback).limit(limit);
}

// Add User
module.exports.addUser = function(user, callback) {
	User.create(user, callback);
}

// Update User
module.exports.updateUser = function(id, user, options, callback) {
	var query = {_id: id};
	var update = {
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
		center_id: user.center_id,
		password: user.password,
		nationality: user.nationality,
		phone: user.phone,
		location: user.location,
		avatar: user.avatar,
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete user
module.exports.deleteUser = function(id, callback) {
	var query = {_id: id};
	User.remove(query, callback);
}