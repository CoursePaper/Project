var globalUser = {};
var userProfile = {};
var globalLesson = {};
var chat = {};
var lessonsArray = [];
var lessonsPArray = [];
var template = [{
	date: '---',
	tim: '---',
	languag: '---',
	teacher: {
		teacherUserName: '---'
	},
	student: {
		studentUserName: '---'
	}
}];
var rCtrl = angular.module('rCtrl', ['registrationServices']);

rCtrl.controller('rCtrl', ['$location', '$scope', 'User',
	function ($location, $scope, User) {
		$scope.signUp = function () {
			User.registration($scope.username, $scope.firstname, $scope.lastname,
				$scope.useremail, $scope.password, $scope.country).then(function (data) {
				if (data.data == 500) {
					$('p#error').remove();
					$('#login-pass').val('');
					$('<p>Error! Such user name is allready exist!</p>').attr('id','error').insertBefore('div.ln');
				} else {
					console.log(data);
					$location.path('/myprof');
					globalUser.uname = data.data.username;
					globalUser.ulname = data.data.lastName;
					globalUser.ufname = data.data.firstName;
					globalUser.ucountry = data.data.country;
					globalUser._id = data.data._id;
					$scope.user = globalUser;
				}
				$scope.user = globalUser;
			});
		};
		$scope.user = globalUser;
		$scope.signIn = function () {
			User.enterence($scope.username, $scope.password).then(function (data) {
				if (data.data == 500) {
					console.log("sin error");
					$location.path('/sin');
					$('p#error').remove();
					$('<p>Error! Invalid user name or password!</p>').attr('id','error').insertBefore('button#login');

				} else {
					console.log(data);
					$location.path('/myprof');
					//console.log($location.path());
					globalUser.uname = data.data.username;
					globalUser.ulname = data.data.lastName;
					globalUser.ufname = data.data.firstName;
					globalUser.ucountry = data.data.country;
					globalUser._id = data.data._id;
				}
			});
		};

		$scope.sendMessage = function () {
			User.sendmess($scope.message, $scope.user).then(function (data) {});
		};

		$scope.hideCreatingLessons = function () {
			$('#inviz').css("display", "none");
		};

		$scope.openCreationLessons = function() {
			$('p#error').remove();
			$('input#login-name').value = "";
			$('#inviz').css("display", "block");
		}

		$scope.createLesson = function () {
			User.addlesson($scope.studentUserName, $scope.user._id, $scope.languag, $scope.date, $scope.tim).then(function (data) {
				console.log(data.data);
				if (data.data == 500) {
					$('p#error').remove();
					$('<p>Error! Invalid user name of student!</p>').attr('id','error').insertBefore('#iii');
				} else {
					if (data.data == 400) {
						$('p#error').remove();
						$('<p>Error! Such lesson is already exist!</p>').attr('id','error').insertBefore('#iii');
					} else {
						$('p#error').remove();
						$('<p>Success! The lesson were added!</p>').attr('id','error').insertBefore('#iii');
						globalLesson.studentUserName = data.data.student.studentUserName;
						globalLesson.teacherUserName = data.data.teacher.teacherUserName;
						globalLesson.languag = data.data.languag;
						globalLesson.date = (data.data.date.day + '.' + data.data.date.month + '.' + data.data.date.year);
						globalLesson.tim = data.data.tim;
						console.log(data.data);
						$scope.loadLessons($scope.user._id);
					}
				}
				$scope.loadLessons
			});
		}
		$scope.lesson = globalLesson;

		$scope.showProfile = function (ID) {
			User.loadProfile(ID).then(function (data) {
				if (data.data == 500) {
					alert("Error :(");
				} else {
					if (data.data._id == $scope.user._id) {
						$location.path('/myprof');
					} else {
						userProfile.uname = data.data.username;
						userProfile.ulname = data.data.lastName;
						userProfile.ufname = data.data.firstName;
						userProfile.ucountry = data.data.country;
						userProfile._id = data.data._id;
						$location.path('/prof');
					}
				}
			});
		}
		$scope.uProfile = userProfile;

		$scope.loadLessons = function () {
			User.loadlessons($scope.user._id).then(function (data){
				if (data.data != 500) {
					lessonsArray = data.data;
					console.log(data.data);
					lessonsArray.pop();
					$scope.lesArray = lessonsArray;
				} else {
					lessonsArray = template;
					$scope.lesArray = template;
				}
			});
		}
		$scope.lesArray = lessonsArray;

		$scope.loadProfileLessons = function () {
			User.loadlessons($scope.uProfile._id).then(function (data){
				if (data.data != 500) {
					lessonsPArray = data.data;
					console.log(data.data);
					lessonsPArray.pop();
					$scope.lesPArray = lessonsPArray;
				} else {
					lessonsPArray = template;
					$scope.lesPArray = template;
				}
			});
		}

		$scope.enterLesson = function (Id) {
			User.enterLesson(Id, $scope.user.uname).then(function (data) {
				if (data.data == 500) {
					alert("Access denied!");
				} else {
					$location.path('/lesson');
					console.log(data.data);
					globalLesson.Id = data.data._id;
					globalLesson.studentUserName = data.data.student.studentUserName;
					globalLesson.teacherUserName = data.data.teacher.teacherUserName;
					globalLesson.idStudent = data.data.student.idStudent;
					globalLesson.idTeacher = data.data.teacher.idTeacher;
					globalLesson.languag = data.data.languag;
					globalLesson.date = (data.data.date.day + '.' + data.data.date.month + '.' + data.data.date.year);
					globalLesson.tim = data.data.tim;
					$scope.lesson = globalLesson;

					$scope.loadChat(globalLesson.Id);
				}

			});
		}

		$scope.sendMessage = function () {
			User.sendmess($scope.lesson.Id, $scope.message, $scope.user.uname).then(function (data) {
				console.log(data.data);
				$('.mess').value = "";
				$scope.loadChat(globalLesson.Id);
			});
		};

		$scope.reloading = function (n) {
			if (n==0)  $scope.loadChat(globalLesson.Id);
			var timerId = setTimeout(function tick() {
				if ($location.path() == '/lesson') {
				  $scope.loadChat(globalLesson.Id);
				  timerId = setTimeout(tick, 2000);
				  n++;
				} else return;
			}, 2000);
		}
		
		$scope.loadChat = function (lessonId) {
			User.loadChat(lessonId).then(function (data) {
				chat = data.data;
				$scope.Chat = chat;
				$('.wchat').scrollTop($(".wchat")[0].scrollHeight);
			});
		}
		$scope.main = function () {
			function hasGetUserMedia() {
			return !!(navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia);
			}
			if (hasGetUserMedia) {
				console.log('GUM is supported in your brouser!');
			}
			else {
				console.log('GUM is NOT supported in your brouser!');
			}
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			videoElement = document.querySelector('#localVideo');
			subVideoElement = document.querySelector('#remoteVideo');

			function successCallback(stream) {
				window.stream = stream;
				videoElement.src = window.URL.createObjectURL(stream);
				videoElement.play();
				subVideoElement.src = window.URL.createObjectURL(stream);
				subVideoElement.play();
				console.log('U should see the image of you camera');

				$('.hangup').click(function () {
					videoElement.pause();
					subVideoElement.pause();
					$('#localVideo').fadeOut();
					$('#remoteVideo').fadeOut();
					stream.stop();
				});
			}

			function errorCallback(error){
			  console.log('navigator.getUserMedia error: ', error);
			}

			function start(){
				navigator.getUserMedia({video:true}, successCallback, errorCallback);
				$('#localVideo').fadeIn();
				$('#remoteVideo').fadeIn();
				}
			console.log('before GUM');
			start();
			console.log('after GUM');
		}

	}
]);

//"C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe" --dbpath "D:\webrtc-v1\Project1\data\db"

// var peer = new Peer($scope.user._id ,{port: 3000, debug: 1});
// //peer.on('connection',function(conn){});//data conection
// //
// // Call a peer, providing our mediaStream
// var call = peer.call('dest-peer-id',mediaStream);

// //peer.on(event, callback);
// peer.on('call', function(call) {
//   // Answer the call, providing our mediaStream
//   call.answer(mediaStream);
// });

// call.on('stream', function(stream) {
//   // `stream` is the MediaStream of the remote peer.
//   // Here you'd add it to an HTML video/canvas element.
// });


// Connecting peer
// var peer = new Peer('anotherid', {key: 'apikey'});
// var conn = peer.connect('someid');
// conn.on('open', function(){
//   conn.send('hi!');
// });
