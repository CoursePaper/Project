'use strict';

angular.module('webrtcV0App', [
  'ngResource',
  'ngRoute',
  //'eCtrl',
  'rCtrl'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../app/views/index.html'
        // controller: 'newUserCtrl'
      })
       .when('/myprof', {
        templateUrl: '../app/views/viewProfile.html',
        // controller: 'MainCtrl'
      })
       .when('/prof', {
        templateUrl: '../app/views/profile.html',
        // controller: 'MainCtrl'
      })
       .when('/less', {
        templateUrl: '../app/views/lesson1.html',
        controller: 'rCtrl'
      })
       .when('/lesson', {
        templateUrl: '../app/views/lesson.html',
        controller: 'rCtrl'
      })
      .when('/cont', {
        templateUrl: '../app/views/contacts.html'
        // controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: '../app/views/about.html'
        // controller: 'MainCtrl'
      })
      .when('/sin', {
        templateUrl: '../app/views/signin.html',
        controller: 'rCtrl'
      })
      .when('/sup', {
        templateUrl: '../app/views/signup.html',
        controller: 'rCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html'
        // controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
