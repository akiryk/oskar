'use strict';

angular.module('myApp.service.presence', [])
  .factory('presenceService', function(){

    var Presence = {
      start: function(uid){
        var amOnline = new Firebase('https://oskar-lingo.firebaseio.com/.info/connected');
        var userRef = new Firebase('https://oskar-lingo.firebaseio.com/presence/' + uid);
        userRef.on('value', function(snapshot) {
          console.log(snapshot.val() );
        });
        amOnline.on('value', function(snapshot) {
          if (snapshot.val()) {
            userRef.onDisconnect().remove();
            userRef.set('★ online');
          }
        });

      },
      getStatus: function(uid){
        var userRef = new Firebase('https://oskar-lingo.firebaseio.com/presence/' + uid);
        userRef.on('value', function(snapshot) {
          if (snapshot.val() === true) {
            // User is online, update UI.
            console.log('this user is online');
          } else {
            console.log('this user isnt on line');
          }
        });
      }
    };

    return Presence;

  });