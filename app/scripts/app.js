/* global myApp:true */
/* exported myApp */

'use strict';

var myApp = angular.module('myApp',
  [
    'myApp.config',
    'myApp.routes',
    'myApp.services',
    'myApp.filters'
  ])
  .run(['loginService', '$rootScope', 'FBURL',
    function(loginService, $rootScope, FBURL) {
      $rootScope.auth = loginService.init('/login');
      $rootScope.FBURL = FBURL;
    }
  ]
);