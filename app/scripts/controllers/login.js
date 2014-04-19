/*
 * Login Controller
 */

'use strict';

angular.module('myApp')
  .controller('LoginCtrl', ['$scope', '$location', 'loginService',
    function($scope, $location, loginService) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;

      $scope.login = function (cb) {
        $scope.error = null;
        if (!$scope.user.email) {
          $scope.error = 'Please enter an email address';
        }
        else if (!$scope.user.password) {
          $scope.error = 'Please enter a password';
        }
        else {
          loginService.login($scope.user.email, $scope.user.password, function (err, user) {
            $scope.error = err ? err + '' : null;
            if (!err) {
              cb && cb(user);
            }
          });
        }
      };
    }]);

