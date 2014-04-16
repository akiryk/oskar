'use strict';

myApp.controller('MainCtrl', function ($scope, userService, languageService) {
  $scope.languages = languageService.all;

  $scope.findSpeakers = function(){
    $scope.speakers = {};
    $scope.speakerCount = 0;
    angular.forEach($scope.practiceLanguage.speakers, function(username) {
      $scope.speakers[username] = userService.findByUsername(username);
      $scope.speakerCount ++;
    });
  };

});