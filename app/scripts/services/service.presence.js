'use strict';

angular.module('myApp.service.presence', [])
  .factory('presenceService', function($rootScope, $firebase, $q){
//    var authRef = new Firebase('https://oskar-lingo.firebaseio.com/.info/authenticated');
    var presenceRef = new Firebase('https://oskar-lingo.firebaseio.com/.info/connected');
    var userRef;

    /*
     * Use module.simpleLoginTools waitForAuth service to tell when user
     * is logged in. Don't start tracking their presence until they are logged in.
     */
//    waitForAuth.then(function(){
//      if ($rootScope.auth.user) {
//        startWatching();
//      }
//    });

    $rootScope.$on('$firebaseSimpleLogin:logout', stopWatching);
    $rootScope.$on('$firebaseSimpleLogin:login', startWatching);

    function startWatching(){

      userRef = new Firebase('https://oskar-lingo.firebaseio.com/presence/' + $rootScope.auth.user.uid);
      // Firebase onValue event fires when the data changes.
      presenceRef.on('value', function (snap) {
        if (snap.val()) {
          userRef.set({ connected: true });
          userRef.onDisconnect().remove();
        }
      });
//      authRef.on('value', function(snap) {
//        console.log('change in auth status');
//         if(snap.val()) {
//           console.log('yes a value');
//           console.log(snap.val());
////           userRef.remove();
//         } else {
//           stopWatching();)
//         }
//      });
    };

    function stopWatching(){
      console.log('stopping...');
      if (userRef){
        console.log('stopped');
        userRef.remove();
      }
    };


    return {
      getStatus: function(uid){
        var ref = new Firebase('https://oskar-lingo.firebaseio.com/presence/' + uid);
        var deferred = $q.defer();
        ref.on('value', function(snap){
          if (snap.val() && snap.val().connected) {
            deferred.resolve(true);
          } else {
            deferred.reject(false);
          }
        });
        return deferred.promise;
      },
      startPresence: function(){
        console.log('should start');
        startWatching();
      }
    };

  });