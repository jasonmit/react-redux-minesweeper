import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '../../store/create-store';
import { newGame } from '../../store/actions/app';
import Avatar from '../../components/avatar';
import Timer from '../../components/timer';
import Cell from '../../components/cell';
import App from './index';

function createApplication() {
  return new Promise(resolve => {
    const store = createStore();
    store.dispatch(newGame());
    resolve(mount(<Provider store={store}><App /></Provider>));
  });
}

describe('acceptance/smoke tests', () => {
  it('contains one avatar ', async function() {
    const target = await createApplication();
    expect(target.find(Avatar)).to.have.length(1);
  });

  it('contains one timer', async function() {
    const target = await createApplication();
    expect(target.find(Timer)).to.have.length(1);
  });

  it('contains 9 rows with 9 columns by default', async function() {
    const target = await createApplication();
    expect(target.find(Cell)).to.have.length(81);
  });
});
