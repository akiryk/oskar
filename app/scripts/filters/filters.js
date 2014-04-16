'use strict';

angular.module('myApp')
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
  }
);