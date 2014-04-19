'use strict';

angular.module('myApp.service.presence', [])
  .factory('presenceService', function($rootScope, $firebase, $q, FBURL, waitForAuth){

    var presenceRef = new Firebase('https://oskar-lingo.firebaseio.com/.info/connected');
    var presentList = new Firebase('https://oskar-lingo.firebaseio.com/presence/');
    var userRef;

    /*
     * Use module.simpleLoginTools waitForAuth service to tell when user
     * is logged in. Don't start tracking their presence until they are logged in.
     */
    waitForAuth.then(function(){
      userRef = new Firebase('https://oskar-lingo.firebaseio.com/presence/' + $rootScope.auth.user.uid);
      // Firebase onValue event fires when the data changes.
      presenceRef.on('value', function(snap) {
        if (snap.val()) {
          userRef.set({ connected: true });
          userRef.onDisconnect().remove();
        }
      });
    });

    return {
      isConnected: function(uid){
        var ref = new Firebase('https://oskar-lingo.firebaseio.com/presence/' + uid);
        var deferred = $q.defer();
        ref.on('value', function(snap){
          if (snap.val()) {
            deferred.resolve(true);
          } else {
            deferred.reject(false);
          }
        });
        return deferred.promise;
      }
    }

  });