var globalUser = {};
var globalLesson = {};
var chat = {};
var lessonsArray = [];
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
					$location.path('/prof');
					globalUser.uname = data.data.username;
					globalUser.ulname = data.data.lastName;
					globalUser.ufname = data.data.firstName;
					globalUser.ucountry = data.data.country;
					globalUser._id = data.data._id;
				}				
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
					$location.path('/prof');
					globalUser.uname = data.data.username;
					globalUser.ulname = data.data.lastName;
					globalUser.ufname = data.data.firstName;
					globalUser.ucountry = data.data.country;
					globalUser._id = data.data._id;
					//loadLessons();
				}
			});
		};
		$scope.user = globalUser;











		$scope.sendMessage = function () {
			//console.log("!!!!!!!!!!!!Chat!!!!!!!!!!!");
			User.sendmess($scope.message, $scope.user).then(function (data) {
				/*if (data.data == 500) {
					console.log("Message error!");

				} else {
					console.log("Message okey!");
				}*/
			});
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
						$scope.loadLessons();
					}
				}
			});
		}
		$scope.lesson = globalLesson;

		$scope.showProfile = function (ID) {
			// User.getUserData().then();
			// console.log(ID);
		}

		// $scope.enterLesson = function () {

		// }
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

		$scope.enterLesson = function (Id) {
			// console.log(Id);
			User.enterLesson(Id, $scope.user.uname).then(function (data) {
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

			});
			// $scope.lesson = globalLesson;
		}

		$scope.sendMessage = function () {
			User.sendmess($scope.lesson.Id, $scope.message, $scope.user.uname).then(function (data) {
				// if (data.data == 500) {
				// 	console.log("Message error!");

				// } else {
				// 	console.log(data.data);
				// }
				console.log(data.data);
				$('.mess').value = "";
				$scope.loadChat(globalLesson.Id);
			});
		};

		$scope.reloading = function () {
			var timeoutId = setInterval($scope.loadChat(globalLesson.Id), 5000 );
			console.log("let's started");
			return timeoutId;
		}

		$scope.loadChat = function (lessonId) {
			User.loadChat(lessonId).then(function (data) {
				chat = data.data;
				// console.log(chat);
				$scope.Chat = chat;
				console.log("in loadChat()");
				$('.wchat').scrollTop($(".wchat")[0].scrollHeight);
			});
			console.log("out of loadChat()");
			// $('.wchat').scrollTop($(".wchat")[0].scrollHeight);
			// $scope.chat = Chat;
		}
		// $scope.chat = Chat;

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

				//  $scope.peer = new Peer($scope.user._id);
				//  // Call a peer, providing our mediaStream
				//  if ($scope.lesson.studentUserName == $scope.user._id) {
				//  	Id = $scope.lesson.teacherUserName;
				//  } else {
				//  	Id = $scope.lesson.studentUserName;
				//  }
				//  $scope.call = peer.call($scope.lesson.Id, stream);
				//  //answer
				//  peer.on(call, function(call) {
				// // Answer the call, providing our mediaStream
				// call.answer(stream);
				//  });
				//  call.on(stream, function(stream) {
				//     // `stream` is the MediaStream of the remote peer.
				//  // Here you'd add it to an HTML video/canvas element.
				//  });
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
