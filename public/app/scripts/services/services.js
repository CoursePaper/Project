//'use strict';

// angular.module('webrtcServices', ['ngResource'])
// //.factory('feed'
// 	.service('feed','$http',
// 	// function($resource){
// 	// 	return $resource(
// 	// 		'/:Id',
// 	// 		{Id:'@Id'},{'review': {'method':'GET',isArray:true}}
// 	// 	);
// 	// }
// 	function getuser($http) {
// 		//
// 		return $http({
// 			method: 'post',
// 			url: '/sss',
// 			params: {
// 				//
// 			}
// 		});
// 	}
// );

var registrationServices = angular.module('registrationServices', []);
//var enterenceServices = angular.module('enterenceServices', []);

registrationServices.service('User', ['$http', '$q',
 function ($http, $q) {
 	return ({
 		registration: registration,
 		enterence: enterence,
 		addlesson: addlesson,
 		loadlessons: loadlessons,
 		sendmess: sendmess,
 		enterLesson: enterLesson,
 		loadChat: loadChat
 	});

 	function registration (username, firstname, lastname, useremail, password, country) {
 		return $http({
 			method: 'post',
 			url: 'signup',
 			params: {
 				username: username,
 				useremail: useremail,
 				firstname: firstname,
 				lastname:lastname,
 				password: password,
 				country: country
 			}
 		});
 	}

	function enterence (username, password) {
 		return $http({
 			method: 'post',
 			url: 'signin',
 			params: {
 				username: username,
 				password: password
 			}
 		});
 	}

 	function addlesson (studentUserName, idTeacher, languag, date, tim) {
 		return $http({
 			method: 'get',
 			url: 'addlesson',
 			params: {
 				studentUserName: studentUserName,
 				idTeacher: idTeacher,
 				languag: languag,
 				date: date,
 				tim: tim 
 			}
 		});
 	}

 	function loadlessons (userId) {
 		return $http({
 			methid: 'get',
 			url: 'sendLesson',
 			params: {
 				userId: userId
 			}
 		});
 	}

 	function sendmess (lessId, message, username) {
 		return $http({
 			method: 'post',
 			url: 'getMessage',
 			params: {
 				lessId: lessId,
 				message: message,
 				username: username
 			}
 		});
 	}

 	function enterLesson (idlesson, username) {
 		return $http({
 			method: 'get',
 			url: 'chekingUsernameAndIdLesson',
 			params: {
 				idlesson: idlesson,
 				username: username
 			}
 		});
 	}

 	function loadChat (lessonid) {
 		return $http({
 			method: 'get',
 			url: 'ChatLoadging',
 			params: {
 				idlesson: lessonid
 			}
 		});
 	}
 }]);