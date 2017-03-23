import webdriver from 'selenium-webdriver';
import Chai from "chai"

let expect = Chai.expect;
let assert = Chai.assert;

class Probe{
  expect(){
    return expect;
  }
  assert(){
    return assert;
  }
  by() {
    return webdriver.By;
  };

  until (){
    return webdriver.until;
  }

  driver() {
    return new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  }
}

export default new Probe();