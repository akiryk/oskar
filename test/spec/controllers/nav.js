'use strict';

describe('Controller: NavController', function () {

  // load the controller's module
  beforeEach(module('oskarApp'));

  describe('A contain test', function(){
    var arr = [1, 2, 3, 4];
    it('should contain the number 4', function(){
      expect(arr).toContain(4);
      expect(arr).not.toContain(5);
    });
  });

  describe('A defined/undefined test', function(){
    var value = 10,
        nuthin;

    it('should be defined', function(){
      expect(value).toBeDefined();
    });
    it('should know what isn\'t defined', function(){
      expect(nuthin).toBeUndefined();
    });
  });


});
