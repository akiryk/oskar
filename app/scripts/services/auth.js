/*
 * Auth Servicee
 */

'use strict';

myApp.factory('Auth',
  function($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {

    var ref = new Firebase(FIREBASE_URL);

    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
      register: function (user) {
        return auth.$createUser(user.email, user.password);
      },
      signedIn: function () {
        return auth.user !== null;
      },
      login: function (user) {
        return auth.$login('password', user); // $login takes type of login and an object
      },
      logout: function () {
        auth.$logout();
      }
    };

    /*
     * Enable checking for signin from anywhere, any controller, any view:
     */
    $rootScope.signedIn = function(){
      return Auth.signedIn();
    };

    return Auth;
  });