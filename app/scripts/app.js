/* global myApp:true */

'use strict';

var myApp = angular
  .module('oskarApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://oskar-lingo.firebaseio.com/');
