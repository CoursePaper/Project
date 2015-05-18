
var mongoose = require('mongoose');

module.exports = mongoose.model('Lesson',{
	student: { idStudent: String, studentUserName: String},
	teacher: { idTeacher: String, teacherUserName: String },
	languag: String,
	date: { day: String, month: String, year: String },
	tim: String,
	chat: []
});