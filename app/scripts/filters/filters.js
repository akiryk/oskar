'use strict';

angular.module('myApp.filters', [])
  .filter('objectByKeyValFilter', function () {
    return function (input, filterKey, filterVal) {
      var filteredInput ={};
      angular.forEach(input, function(value, key){
        if(value[filterKey] && value[filterKey] !== filterVal){
          filteredInput[key]= value;
        }
      });
      return filteredInput;
    };
  })
  .filter('orderObjects', function(){
    var sortByProp = function(prop){
      return function(obj1, obj2){
        var a = obj1[prop].toLowerCase(),
            b = obj2[prop].toLowerCase();
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      };
    };
    return function(input, property){
      input.sort(sortByProp(property));
      return input;
    };
  }
);