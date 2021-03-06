var express = require('express');
var router = express.Router();
var Lesson = require('../models/lessons');
var User = require('../models/user');
var Mess = require('../models/mess');
//var Sync = require('sync');
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res){
		//res.render('index',{message: req.flash('message')});
		res.sendfile("public/app/index.html");
        
	});
	
	router.post('/signin', function(req, res, next) {
		//console.log(req.body);
		User.findOne({ 'username' :  req.param('username') }, function(err, user){
                    console.log(req.param('username'));
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignIn: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                    	if(user.password == req.param('password')){
                    		console.log("Okey");
                    		//res.send(user);
                            res.json(user);
                    	}
                    	else {
                    		console.log("incorrected password");
                    		res.json(500)
                    	}
                    } else {
                        console.log("user not found");
                        res.json(500);
                    }
                });
	});

	router.get('/addlesson', function(req, res){

            User.findOne({ 'username' :  req.param('studentUserName') }, function(err, userStudent){
                        // In case of any error, return using the done method
                        if (err){
                            console.log('Error in reqistrate new lesson: '+err);
                            return done(err);
                        }
                        if (userStudent) {
                            console.log("Such student is finded");
                            var newLesson = new Lesson();
                            newLesson.student.idStudent = userStudent._id;
                            newLesson.student.studentUserName = userStudent.username;
                            newLesson.teacher.idTeacher = req.param('idTeacher');
                            newLesson.chat = [];
                            User.findOne({ '_id': req.param('idTeacher') }, function(err, user){
                                if(user){
                                    newLesson.teacher.teacherUserName = user.username;
                                }
                            });
                            newLesson.languag = req.param('languag');
                            var date = req.param('date').split('.');
                            var time = req.param('tim').split('.');

                            var currentDate = new Date();
                            if( parseInt(time[1]) < currentDate.getMinutes()){
                                console.log("minutes");
                            }
                            if( parseInt(time[0]) < currentDate.getHours()){
                                console.log("hours");
                            }
                            console.log(time);
                            console.log(currentDate.getFullYear());
                            console.log(currentDate.getMonth() + 1);
                            console.log(currentDate.getDate());
                            console.log(currentDate.getHours());
                            console.log(currentDate.getMinutes());
                            if (parseInt(date[2]) < currentDate.getFullYear()){
                                console.log("Check data, that you tipe bellow");
                                res.json("Check data, that you tipe bellow");
                            } else if (parseInt(date[1]) < currentDate.getMonth() + 1) {
                                console.log("Check data, that you tipe bellow");
                                res.json("Check data, that you tipe bellow");
                            } else if(parseInt(date[0]) < currentDate.getDate()){
                                console.log("Check data, that you tipe bellow");
                                res.json(400);
                            } else 
                            if(currentDate.getFullYear() == parseInt(date[2]) && 
                                currentDate.getMonth() + 1 == parseInt(date[1]) && 
                                currentDate.getDate() == parseInt(date[0]) &&
                                parseInt(time[0]) < currentDate.getHours()){
                                console.log("Check data, that you tipe bellow");
                                res.json("Check data, that you tipe bellow");
                            } else if( currentDate.getFullYear() == parseInt(date[2]) && 
                                currentDate.getMonth() + 1 == parseInt(date[1]) && 
                                currentDate.getDate() == parseInt(date[0]) &&
                                parseInt(time[0]) == currentDate.getHours() &&
                                parseInt(time[1]) <= currentDate.getMinutes()){
                                console.log("Check data, that you tipe bellow");
                                res.json("Check data, that you tipe bellow");
                            } else {
                                newLesson.date.day = date[0];
                                newLesson.date.month = date[1];
                                newLesson.date.year = date[2];
                            
                                newLesson.tim = req.param('tim');
                                User.findOne({ '_id' :  req.param('idTeacher') }, function(err, userTeacher){
                                        if (userTeacher) {
                                            newLesson.save(function(err) {
                                                if (err){
                                                    console.log('Error in Saving new lesson: '+err);  
                                                    throw err;  
                                                }

                                                res.json(newLesson);

                                                console.log('New lesson registration succesful');    
                                            });
                                        }
                                });
                            }
                            
                        } else {
                            console.log("Such student is  not finded");
                            res.json(500);
                        }
            });
    });

router.get('/sendLesson', function(req, res){
    var lessonsArray;
    Lesson.find({'teacher.idTeacher': req.param('userId')}, function(err, lessons){
        Lesson.find({'student.idStudent': req.param('userId')}, function(err, lessons){
            console.log("lessons where student" + lessons.length);
            if (lessons.length == 0){
                console.log("---------");
                console.log("No find lessons where student");
                console.log("---------");
            }
            else {
                lessonsArray.push(lessons);
            }
            if(lessonsArray.length == 0)     
                res.json(500);
            else {
                res.json(lessonsArray);
                console.log(lessonsArray);
            }
        });
        console.log("lessons where teacher" + lessons.length);
        if(lessons){
            lessonsArray = lessons;
        }
    });
    console.log('finding lessons');
   
});
    
router.post('/signup', function(req, res){
	User.findOne({ 'username' :  req.param('username') }, function(err, user){
        if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
        }
        console.log(req.param('username'));
        if (user) {
            console.log('User already exists with username: '+ user.username);
            res.json(500);
        } else {
            var newUser = new User();
            console.log(req.param('username'));
            newUser.username = req.param('username');
            newUser.password = (req.param('password'));
            newUser.email = req.param('useremail');
            newUser.firstName = req.param('firstname');
            newUser.lastName = req.param('lastname');
            newUser.country = req.param('country');
            newUser.save(function(err) {
                if (err){
                    console.log('Error in Saving user: '+err);  
                    throw err;  
                }
                console.log('User Registration succesful');
                res.json(newUser);
            });
        }});
	});

    router.get('/profile', function(req, res){
        User.findOne({ '_id' :  req.param('userId') }, function(err, user){
            if (err){
                console.log('Error in loading profile: ' + err);
                return done(err);
            }
            if (user) {
                res.json(user);
            } else {
                res.json(500);
            }
        });
    });

    router.post('/getMessage', function(req, res){
        var mess = new Mess();
        mess.lessonId = req.param('lessId');
        mess.username = req.param('username');
        mess.mtext = req.param('message');
        mess.save(function(err) {
            if (err){
                console.log('Error in adding mess: ' + err);  
                throw err;  
            }
            console.log('succesful adding mess');    
            //return done(newUser);
            res.json('OK');
            // res.end();
        });
    });

    router.get('/chekingUsernameAndIdLesson', function(req, res){
        Lesson.findOne({ '_id' : req.param('idlesson') }, function(err, lesson){
            if (err){
                console.log("Error in find lesson: " + err);
                return done(err);
            }
            if (lesson){
                if(lesson.student.studentUserName == req.param('username')){
                    res.json(lesson);
                }
                else if (lesson.teacher.teacherUserName = req.param('username')) {
                    res.json(lesson);
                }
                else res.json(500);
            }
        });
    });

    router.get('/ChatLoadging', function(req, res){
        Mess.find({'lessonId': req.param('idlesson')}, function(err, messs){
            if (err){
                console.log("Error in finding messages: " + err);
                return done(err);
            }
            if (messs) res.json(messs);
            else res.json(500);
        });
    });

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





