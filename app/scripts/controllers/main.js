'use strict';

myApp.controller('MainCtrl', function ($scope, userService, languageService, presenceService) {

  $scope.languages = languageService.all;
  $scope.form = {
    practiceLanguage: ''
  };

  $scope.findSpeakers = function(){
    $scope.speakerCount = 0;
    $scope.speakers = {};

    angular.forEach($scope.form.practiceLanguage.teachers, function(username) {
      $scope.speakerCount++;
      $scope.speakers[username] = userService.findByUsername(username);
      // e.g. simplelogin:48: { email: adamkiryk@gmail.com, about: '', etc. }

      presenceService.getStatus(username)
        .then(function(connected){
          $scope.speakers[username].connected = connected;
        });
      

    });

  };

});