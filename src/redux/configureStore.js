import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './sagas';

const configureStore = (preloadedState) => {
  let store;

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    () => next => action => {
      next(action);
    },
  ];
  const composeEnhancers = composeWithDevTools({});

  const enhancer =
    process.env.NODE_ENV !== 'production'
      ? composeEnhancers(applyMiddleware(...middlewares))
      : compose(applyMiddleware(...middlewares));

  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['posts'],
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      preloadedState,
      enhancer,
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      preloadedState,
      enhancer,
    );
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
