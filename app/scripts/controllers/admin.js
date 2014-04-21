'use strict';

angular.module('myApp')
  .controller('AdminCtrl',
    function($scope, $location, userService){

      // Only admins can see this page
      // (We can use $scope to find auth since this page is authRequired in routes.js)
      $scope.user = userService.findByUid($scope.auth.user.uid);
      $scope.user.$on('loaded', function(){
        if ($scope.user.role !== 'admin'){
          $location.path('/');
        }
      });

      $scope.users = userService.getAll();
    }
  );