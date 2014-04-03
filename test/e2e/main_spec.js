/*
 * Basic end to end testing spec with Protractor
 */

'use strict';

describe('E2E: main page', function() {
  var ptor;

  beforeEach(function() {
    browser.get('http://127.0.0.1:9000/');
    ptor = protractor.getInstance();
  });

  it('should load the home page', function(){
    var el = by.id('main-title');
    expect(ptor.isElementPresent(el)).toBe(true);
  });

  it('should have 3 elements in test array', function() {
    // element.all gives us acces to the elements returned by the
    // by.repeater(...) part.
    var elems = element.all(by.repeater('buck in testArray'));
    expect(elems.count()).toBe(3);
  });

});