'use strict';

describe('Timer Component', () => { 
  it('- should start timer', function() {
    browser.get('http://localhost:3000');
    expect(browser.getTitle()).toEqual('Wakati React');
    element(by.id("wakati-start")).click();
  });
});