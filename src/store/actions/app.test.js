import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as appActions from './app';
import * as types from '../constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app actions', () => {
  it('should dispatch new game', () => {
    const store = mockStore();
    store.dispatch(appActions.newGame());

    expect(store.getActions()).to.deep.equal([
      {
        type: types.CONFIGURE_ROUND
      }
    ]);
  });

  it('should dispatch end game', () => {
    const store = mockStore();
    store.dispatch(appActions.endGame());

    expect(store.getActions()).to.deep.equal([
      {
        type: types.STOP_ROUND
      }
    ]);
  });
});
