/*
* User Profile
*/

'use strict';

angular.module('myApp')
  .controller('ProfileCtrl',
    function($scope, $routeParams, userService, languageService) {
      $scope.user = userService.findByUid($routeParams.username);
      $scope.user.$on('loaded', function(user){
        $scope.primaryLanguage = languageService.find(user.motherTongue).name;
      });


//      $scope.updateUserLanguages = function(){
//        var newLanguages = [];
//        for (var key in $scope.languages) {
//          // This charAt(0) trick taken directly from angular.js ngRepeatDirective.
//          if ($scope.languages.hasOwnProperty(key) && key.charAt(0) !== '$') {
//            if ($scope.languages[key].selected) {
//              newLanguages.push(key);
//            }
//          }
//        }
//        $scope.user.$child('languages').$set(newLanguages).then(function(){
//          $location.path('/');
//        });
//      };

//      $rootScope.$watch('currentUser', function(){
//        if ($rootScope.currentUser){
//          if ($scope.user.username === $rootScope.currentUser.username){
//            alert('you are good to go!');
//          } else {
//            alert('you are not good to go...');
//          }
//        }
//      });
//      $scope.user.$on('loaded', function(){
//        angular.forEach($scope.user.languages, function(id){
//          var lang = Language.find(id);
//          lang.$on('loaded', function(){
//            $scope.userLanguages[id] = Language.find(id);
//            $scope.languages[id].selected = true;
//          });
//        });
//      });


    }
);