/*
 * Language Controller
 */

'use strict';

angular.module('myApp')
  .controller('LanguageCtrl', function ($scope, $location, languageService) {

    $scope.addLanguage = function(){
      languageService.create($scope.language).then(
        function(){
          $scope.language.name = '';
          $scope.language.nativeName = '';
        },
        function(error){
          $scope.error = error.toString();
        }
      );
    };

    $scope.data = {
      languages: languageService.all
    };
  });
