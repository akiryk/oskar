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

      var isConnected = presenceService.isConnected($routeParams.username);
      isConnected.then(function(){
        $scope.isConnected = true;
      }, function(){
        $scope.isConnected = false;
      });

    }
);