import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const configureStore = (preloadedState, { isServer, req = null }) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [
    sagaMiddleware,
    store => next => action => {
      next(action);
    },
  ];
  const composeEnhancers = composeWithDevTools({});
  const enhancer =
    process.env.NODE_ENV !== 'production'
      ? composeEnhancers(applyMiddleware(...middlewares))
      : compose(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, preloadedState, enhancer);

  if (req || !isServer) (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
