/*
* User Profile
*/

'use strict';

angular.module('myApp')
  .controller('ProfileCtrl',
    function($scope, $routeParams, userService, languageService, presenceService) {
      $scope.user = userService.findByUid($routeParams.username);
      presenceService;
//      var start = $routeParams.username.lastIndexOf(':');
//      var userid = $routeParams.username.slice(start + 1);
//
//      var userRef = new Firebase('https://oskar-lingo.firebaseio.com/presence/' + userid);
//      userRef.on('value', function(snapshot) {
//        $scope.message = snapshot.val();
//        if (snapshot.val() === true) {
//          // User is online, update UI.
//          $scope.message = 'User ' + userid + ' is online!';
//        } else {
//          $scope.message = 'User ' + userid + ' is off line ' + snapshot.val() + ' seconds ago';
//          // User logged off at snapshot.val() - seconds since epoch.
//        }
//      });

      $scope.user.$on('loaded', function(user){
        $scope.primaryLanguage = languageService.find(user.motherTongue).name;
      });
    }
);