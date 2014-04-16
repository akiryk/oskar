'use strict';

angular.module('myApp.service.language', [])
  .factory('languageService', function ($firebase, FBURL) {
    var ref = new Firebase(FBURL + 'languages');
    var languages = $firebase(ref);

    var Language = {
      all: languages,

      find: function(id){
        return languages.$child(id);
      },
      findByName: function(name){
        return languages.$child(name);
      },
      create: function(language){
        return languages.$add(language);
      },
      removeUserFromLang: function( user, langId) {
        languages.$child(langId).$child('speakers').$remove(user);
      }
    };
    // Public API here
    return Language;
  });