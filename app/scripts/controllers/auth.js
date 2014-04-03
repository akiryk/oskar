/*
 * Auth Controller
 * Handle the login and register view
 */

'use strict';

myApp.controller('AuthController',
  function($scope, $location, Auth){

    if (Auth.isSignedIn()){
      $location.path('/');
    }

    $scope.register = function(){
      Auth.register($scope.user).then(
        function(){
          $location.path('/');
        },
        function(err){
          $scope.error = err.toString();
        }
      );
    };

    $scope.login = function(){
      Auth.login($scope.user).then(
        function(){
          $location.path('/');
        },
        function(){
          $scope.error = 'Hmmm, you did wrong';
        });
    };

  });