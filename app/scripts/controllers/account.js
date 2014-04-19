'use strict';

angular.module('myApp')
  .controller('AccountCtrl',
    function($scope, loginService, userService, languageService, changeEmailService) {

      $scope.languages = languageService.all;
      $scope.user = userService.findByUid($scope.auth.user.uid);
      $scope.user.$on('loaded', function () {
        $scope.userLanguage = $scope.user.motherTongue;
      });

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.msgs = {};

      $scope.reset = function () {
        $scope.msgs = {
          err: null,
          msg: null,
          emailerr: null,
          emailmsg: null,
          success: null
        };
      };

      $scope.formData = {
        teacher: 'true'
      };

      $scope.updateUserLanguage = function () {

        if ($scope.user.motherTongue && $scope.user.motherTongue !== $scope.userLanguage) {
          // a new primary language!
          languageService.removeUserFromLang($scope.auth.user.uid, $scope.user.motherTongue);
        }
        $scope.user.$child('motherTongue').$set($scope.userLanguage)
          .then(function () {
            $scope.msgs.success = 'You did it, yo...';
          })
          .then(function () {
            var lang = languageService.find($scope.userLanguage);
            lang.$on('loaded', function () {
              lang.$child('speakers').$child($scope.user.$id).$set($scope.user.$id);
              if ($scope.formData.teacher === 'true') {
                lang.$child('teachers').$child($scope.user.$id).$set($scope.user.$id);
              }
            });
          }
        );
      };

      $scope.updateAccount = function () {
        userService.updateDetails($scope.user);
      };

      $scope.updatePassword = function () {
        $scope.reset();
        loginService.changePassword(buildPwdParms());
      };

      $scope.updateEmail = function () {
        $scope.reset();
        changeEmailService(buildEmailParms());
      };

      function buildPwdParms() {
        return {
          email: $scope.auth.user.email,
          oldpass: $scope.oldpass,
          newpass: $scope.newpass,
          confirm: $scope.confirm,
          callback: function (err) {
            if (err) {
              $scope.err = err;
            }
            else {
              $scope.oldpass = null;
              $scope.newpass = null;
              $scope.confirm = null;
              $scope.msg = 'Password updated!';
            }
          }
        };
      }

      function buildEmailParms() {
        return {
          newEmail: $scope.newemail,
          pass: $scope.pass,
          callback: function (err) {
            if (err) {
              $scope.emailerr = err;
            }
            else {
              $scope.newemail = null;
              $scope.pass = null;
              $scope.emailmsg = 'Email updated!';
            }
          }
        };
      }

    }
);