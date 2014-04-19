(function() {
  'use strict';

  /* Services */

  angular.module('myApp.services',
    [
      'myApp.service.login',
      'myApp.service.user',
      'myApp.service.firebase',
      'myApp.service.language',
      'myApp.service.presence',
      'myApp.service.changeEmail'
    ]);
})();