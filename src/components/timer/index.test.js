import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Timer from './index';

describe('timer', () => {
  it('should pretend zeros when seconds < 10', () => {
    const timer = shallow(<Timer seconds={9} />);
    expect(timer.text()).to.equal('0:09');
  });

  it('should not zero when seconds > 10', () => {
    const timer = shallow(<Timer seconds={10} />);
    expect(timer.text()).to.equal('0:10');
  });

  it('should correctly compute number of minutes', () => {
    const timer = shallow(<Timer seconds={120} />);
    expect(timer.text()).to.equal('2:00');
  });

  it('should correctly compute number of minutes and carry over seconds', () => {
    const timer = shallow(<Timer seconds={121} />);
    expect(timer.text()).to.equal('2:01');
  });
});
