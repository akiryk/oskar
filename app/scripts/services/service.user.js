/*
 * User Service
 */

'use strict';

angular.module('myApp.service.user', [])
  .factory('userService', function ($firebase, $rootScope, FBURL) {
    var ref = new Firebase(FBURL + 'users');
    var users = $firebase(ref);

    var User = {

      getAll: function() {
        return users;
      },

      create: function (user, callback) {
        var uid = user.uid,
            email = user.email;

        var firstPartOfEmail = function (email) {
          return ucfirst(email.substr(0, email.indexOf('@')) || '');
        };

        var ucfirst = function (str) {
          str += '';
          var f = str.charAt(0).toUpperCase();
          return f + str.substr(1);
        };

        users[uid] = {
          /* jshint camelcase: false */
          md5_hash: user.md5_hash,
          username: firstPartOfEmail(email),
          email: email,
          uid: user.uid,
          $priority: user.uid
        };
        users.$save(uid).then(
          function(){ // success!
            if (typeof callback === 'function'){
              callback();
            }
          }, function(){ // error!
              var err = 'Failure to create a new user';
              callback(err);
            }
        );
      },
      updateDetails: function (user) {
        user.$update(user);
      },
      findByUid: function (id) {
        return users.$child(id);
      },
      findByUsername: function (username) {
        if (username) {
          return users.$child(username);
        }
      }
    };

    return User;
  }
);