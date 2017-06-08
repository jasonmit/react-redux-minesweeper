import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { newGame } from './store/actions/app';
import createStore from './store/create-store';
import App from './container-components/app';
import './index.css';

const store = createStore();
store.dispatch(newGame());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
