/*
 * Language Controller
 */

'use strict';

angular.module('myApp')
  .controller('LanguageCtrl',
    function ($scope, $rootScope, $location, languageService, userService) {

      // Only admins can see this page
      $scope.user = userService.findByUid($scope.auth.user.uid);
      $scope.user.$on('loaded', function(){
        if ($scope.user.role !== 'admin'){
          $location.path('/');
        }
      });

      $scope.data = {
        languages: languageService.all
      };

      var isUnique = function(languageName){
        var unique = true;
        angular.forEach($scope.data.languages, function(value, key){
          if (key.charAt(0) !== '$') {
            if ($scope.data.languages[key].name.toLowerCase() === languageName.toLowerCase()){
              unique = false;
            }
          }
        });
        return unique;
      };

      $scope.addLanguage = function(){
        if (isUnique($scope.language.name)){
          languageService.create($scope.language).then(
            function(){
              $scope.language.name = '';
              $scope.language.localName = '';
            },
            function(error){
              $scope.error = error.toString();
            }
          );
        } else {
          $scope.error = 'Doug, looks like you used the same EXACT language already :( :( :(';
        }
      };
    }
  );
