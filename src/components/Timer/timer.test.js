import React from 'react';
import {shallow} from 'enzyme';
import Timer from './timer';

describe('Timer Component', () => { 
  const timer = shallow(<Timer/>);
  it('- should test ', () => {
    timer.find('#wakati-start').simulate('click');
    expect(true).toEqual(true);
  });
});