/*
 * Angular e2e test runner
 * (This has been superseded by Protractor)
 */

'use strict';

describe('Index Page tests', function(){

  beforeEach(function() {
    browser().navigateTo('/#/')
  });

  it ('redirect works', function() {
    expect(browser().location().url()).toBe('/');
  });

  it('will find 3 repeats', function(){

    expect(repeater('.tester li').count()).toBe(3);
  });

});