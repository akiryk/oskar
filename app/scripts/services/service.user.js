/*
 * User Service
 */

'use strict';

angular.module('myApp.service.user', [])
  .factory('userService', function ($firebase, $rootScope, FBURL) {
    var ref = new Firebase(FBURL + 'users');
    var users = $firebase(ref);

    var User = {
//      create: function (authUser, username) {
//        users[username] = {
//          /* jshint camelcase: false */
//          md5_hash: authUser.md5_hash,
//          username: username,
//          $priority: authUser.uid
//        };
//
//        users.$save(username).then(function () {
//          setCurrentUser(username);
//        });
//      },
      create: function (user, callback) {
        // Helper functions
        var uid = user.uid,
            email = user.email;

        var firstPartOfEmail = function (email) {
          return ucfirst(email.substr(0, email.indexOf('@')) || '');
        };

        var ucfirst = function (str) {
          // credits: http://kevin.vanzonneveld.net
          str += '';
          var f = str.charAt(0).toUpperCase();
          return f + str.substr(1);
        };

        users[uid] = {
          /* jshint camelcase: false */
          md5_hash: user.md5_hash,
          username: firstPartOfEmail(email),
          email: email,
          $priority: user.uid
        };
        users.$save(uid);
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