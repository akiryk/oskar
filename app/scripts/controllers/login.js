/*
 * Login Controller
 */

'use strict';

myApp.controller('LoginCtrl', ['$scope', '$location', 'loginService', 'userService',
  function($scope, $location, loginService, userService) {
    $scope.email = null;
    $scope.pass = null;
    $scope.confirm = null;
    $scope.createMode = false;

    $scope.login = function(cb) {
      // cb = callback fn
      $scope.error = null;
      if( !$scope.user.email ) {
        $scope.error = 'Please enter an email address';
      }
      else if( !$scope.user.password ) {
        $scope.error = 'Please enter a password';
      }
      else {
        loginService.login($scope.user.email, $scope.user.password, function(err, user) {
          $scope.error = err? err + '' : null;
          if( !err ) {
            cb && cb(user);
          }
        });
      }
    };

    $scope.createAccount = function() {
      $scope.err = null;
      if( assertValidLoginAttempt() ) {
        console.log(loginService);
        loginService.createAccount($scope.user.email, $scope.user.password, function(err, user) {
          if( err ) {
            $scope.err = err? err + '' : null;
          }
          else {
            // must be logged in before I can write to my profile
            // We pass a callback function to the login() method.
            $scope.login(function() {
//              loginService.createProfile(user.uid, user.email);
              userService.create(user);
              $location.path('/account');
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
]);
