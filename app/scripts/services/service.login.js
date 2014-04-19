'use strict';

angular.module('myApp.service.login', ['firebase', 'myApp.service.firebase'])

  .factory('loginService',
    function($rootScope, $firebaseSimpleLogin, $timeout, firebaseRef, presenceService) {

      var auth = null;

      var assertAuth = function() {
        if( auth === null ) { throw new Error('Must call loginService.init() before using its methods'); }
      };

      return {
        init: function() {
          auth = $firebaseSimpleLogin(firebaseRef());
          return auth;
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
            presenceService.start(user.uid);
            if( callback ) {
              callback(null, user);
            }
          }, callback);
        },

        logout: function() {
          assertAuth();
          auth.$logout();
          presenceService.end();
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

    });
