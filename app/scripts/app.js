/* global myApp:true */
/* exported myApp */

//TODO: Continue synching firebase seed with oskar.
//  Next: The login controller and auth controller

'use strict';

var myApp = angular.module('myApp',
  [
    'myApp.config',
    'myApp.routes',
    'myApp.services',
    'simpleLoginTools',
    'routeSecurity'
  ])
  .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
    $rootScope.auth = loginService.init('/login');
    $rootScope.FBURL = FBURL;
    }
  ]);