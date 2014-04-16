'use strict';

angular.module('myApp')
  .controller('PrivateProfileCtrl',
    function($scope, $routeParams, $location, User, Language){
      var currentUser = User.getCurrent();

      $scope.user = User.findByUsername($routeParams.username);

      $scope.user.$on('loaded', function(){
        if (typeof currentUser === 'undefined') {
          $location.path('/');
        } else if ($routeParams.username !== currentUser.username) {
          $location.path('/');
        }
        $scope.languages = Language.all;
      });

      $scope.updateUserLanguage = function(){
        $scope.user.$child('motherTongue').$set($scope.userLanguage.$id)
          .then(function(){
            $scope.message.success = "You did it, yo..."
          })
          .then(function(){
            var lang = Language.find($scope.userLanguage.$id);
            lang.$on('loaded', function(){
              lang.$child('speakers').$add($scope.user.username);
            })
          });
      };

      $scope.updateUser = function(){
        User.updateDetails($scope.user);
      };
    }
);