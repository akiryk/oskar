/*
 * Nav Controller
 */

'use strict';

myApp.controller('NavController', function($scope, Auth){
  $scope.logout = function(){
    Auth.logout();
  };
});