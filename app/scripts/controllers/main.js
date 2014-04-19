'use strict';

myApp.controller('MainCtrl', function ($scope, userService, languageService, presenceService) {

  $scope.languages = languageService.all;
  $scope.form = {
    practiceLanguage: ''
  };

  $scope.findSpeakers = function(){
    $scope.speakers = {};
    $scope.speakerCount = 0;
    angular.forEach($scope.form.practiceLanguage.teachers, function(username) {
      $scope.speakers[username] = userService.findByUsername(username);
      $scope.speakerCount ++;
    });
  };

});