/*
 * Nav Controller
 */

'use strict';

angular.module('myApp')
  .controller('NavCtrl', function ($scope, $rootScope, loginService, userService) {

    $scope.logout = function(){
      loginService.logout();
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
      $scope.user = userService.findByUid(authUser.uid);
    });

  });