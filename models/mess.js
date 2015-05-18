
var mongoose = require('mongoose');

module.exports = mongoose.model('Message',{
	lessonId: String,
	username: String,
	mtext: String//,
	// date: String,
});