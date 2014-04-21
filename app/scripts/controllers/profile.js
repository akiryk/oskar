/*
* User Profile
*/

'use strict';

angular.module('myApp')
  .controller('ProfileCtrl',
    function($scope, $routeParams, userService, languageService, presenceService) {

      $scope.user = userService.findByUid($routeParams.username);

      $scope.user.$on('loaded', function(user){
        var lang = languageService.find(user.motherTongue);
        lang.$on('loaded', function(language){
          $scope.primaryLanguage = language.name;
        });
      });

      presenceService.getStatus($routeParams.username)
        .then(function(connected){
          $scope.isConnected = connected;
        });

    }
);