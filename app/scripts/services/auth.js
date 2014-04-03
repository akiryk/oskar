/*
 * Auth authorization service
 */

'use strict';

myApp.factory('Auth',
    function($firebaseSimpleLogin, FIREBASE_URL, $rootScope){
      var ref = new Firebase(FIREBASE_URL);
      var auth = $firebaseSimpleLogin(ref);

      var Auth = {
        login: function(user){
          return auth.$login('password', user);
        },
        logout: function(){
          auth.$logout();
        },
        register: function(user){
          return auth.$createUser(user.email, user.password);
        },
        isSignedIn: function(){
          return auth.user !== null;
        }
      };

      $rootScope.isSignedIn = function(){
        return Auth.isSignedIn();
      };

      return Auth;
    });