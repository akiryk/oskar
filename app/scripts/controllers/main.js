'use strict';

myApp.controller('MainCtrl', function ($scope, userService, languageService, presenceService) {

  $scope.languages = languageService.all;
  $scope.form = {
    practiceLanguage: ''
  };

  $scope.findSpeakers = function(){
    $scope.speakers = [];
    var speakerObj = {};
    angular.forEach($scope.form.practiceLanguage.teachers, function(username) {
      speakerObj = {
        user: userService.findByUsername(username),
        uid: username
      };

      presenceService.getStatus(username)
        .then(function(connected){
          console.log(username + ' is connected: ' + connected);
          speakerObj.connected = connected;
        });
      $scope.speakers.push(speakerObj);
    });
  };

});