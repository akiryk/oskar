'use strict';

angular.module('myApp.routes', ['ngRoute'])

  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    });

    $routeProvider.when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    });

    $routeProvider.when('/register', {
      templateUrl: 'views/register.html',
      controller: 'LoginCtrl'
    });

    $routeProvider.when('/edit-language', {
      templateUrl: 'views/edit-language.html',
      controller: 'LanguageCtrl'
    });

    $routeProvider.when('/account', {
      authRequired: true,
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl'
    });

    $routeProvider.when('/users/:username', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});
  }]);


