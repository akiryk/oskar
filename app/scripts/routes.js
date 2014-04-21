'use strict';

angular.module('myApp.routes', ['ngRoute'])

  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    })
    .when('/edit-language', {
      authRequired: true,
      templateUrl: 'views/edit-language.html',
      controller: 'LanguageCtrl'
    })
    .when('/account', {
      authRequired: true,
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl'
    })
    .when('/users/:username', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .when('/admin/users', {
      authRequired: true,
      templateUrl: 'views/admin/users.html',
      controller: 'AdminCtrl'
    })
    .otherwise({redirectTo: '/'});
  }]);


