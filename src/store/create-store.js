import thunk from 'redux-thunk';
import reducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';

export default () => {
  const middleware = [thunk];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
};
