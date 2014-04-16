'use strict';

angular.module('myApp.service.login', ['firebase', 'myApp.service.firebase'])

  .factory('loginService', ['$rootScope', '$firebaseSimpleLogin', 'firebaseRef', '$timeout',
    function($rootScope, $firebaseSimpleLogin, firebaseRef, $timeout) {

      var auth = null;

      var assertAuth = function() {
        if( auth === null ) { throw new Error('Must call loginService.init() before using its methods'); }
      };

      return {
        init: function() {
          return auth = $firebaseSimpleLogin(firebaseRef());
        },

        /**
         * @param {string} email
         * @param {string} pass
         * @param {Function} [callback]
         * @returns {*}
         */
        login: function(email, pass, callback) {
          assertAuth();
          auth.$login('password', {
            email: email,
            password: pass,
            rememberMe: true
          }).then(function(user) {
            if( callback ) {
              callback(null, user);
            }
          }, callback);
        },

        logout: function() {
          assertAuth();
          auth.$logout();
        },

        changePassword: function(opts) {
          assertAuth();
          var cb = opts.callback || function() {};
          if( !opts.oldpass || !opts.newpass ) {
            $timeout(function(){ cb('Please enter a password'); });
          }
          else if( opts.newpass !== opts.confirm ) {
            $timeout(function() { cb('Passwords do not match'); });
          }
          else {
            auth.$changePassword(opts.email, opts.oldpass, opts.newpass)
              .then(
                function() {
                  cb && cb(null);
                }, cb);
          }
        },

        createAccount: function(email, pass, callback) {
          assertAuth();
          auth.$createUser(email, pass)
            .then(
              function(user) { // success!
                if (typeof callback === 'function') {
                  callback(null, user);
                }
              }, callback); // failure!
        }
      };

    }]);

/*
  .factory('profileCreator', ['firebaseRef', '$timeout', function(firebaseRef, $timeout) {
    return function(id, email, callback) {

      // Helper functions
      var firstPartOfEmail = function(email) {
        return ucfirst(email.substr(0, email.indexOf('@'))||'');
      };

      var ucfirst = function(str) {
        // credits: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      };

      firebaseRef('users/'+id)
        .set(
          {
            email: email,
            username: firstPartOfEmail(email)
          },
        function(err) {
          //err && console.error(err);
          if( callback ) {
            $timeout(function() {
              callback(err);
            });
          }
        }
      );
    };
  }]);
*/