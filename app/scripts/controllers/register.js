'use strict';

angular.module('myApp')
  .controller('RegisterCtrl', function($scope, $location, loginService, userService){

    $scope.createAccount = function() {
      $scope.err = null;
      if( assertValidLoginAttempt() ) {
        loginService.createAccount($scope.user.email, $scope.user.password, function(err) {
          if( err ) {
            $scope.err = err? err + '' : null;
          }
          else {
            // Login with email/pass and a callback function.
            loginService.login($scope.user.email, $scope.user.password, function(err, user) {
              $scope.err = err ? err + '' : null;
              if (!err){
                // Create a user account with an authenticated user and a callback function.
                userService.create(user, function(err){
                  $scope.err = err ? err + '' : null;
                  if (!err){
                    $location.path('/account');
                  }
                });
              }
            });
          }
        });
      }
    };

    function assertValidLoginAttempt() {
      if( !$scope.user.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.user.password ) {
        $scope.err = 'Please enter a password';
      }
      else if( $scope.user.password !== $scope.confirm ) {
        $scope.err = 'Passwords do not match';
      }
      return !$scope.err;
    }
  }
);
