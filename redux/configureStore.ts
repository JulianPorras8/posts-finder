import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import rootReducer from './rootReducer';
import rootSaga from './sagas';

const configureStore = (preloadedState: any, params: any) => {
  console.log('11 isServer', params.isServer);
  console.log('12 preloadedState', preloadedState);
  console.log('13 params', params);
  const createNoopStorage = () => {
    return {
      getItem(_key) {
        return Promise.resolve(null);
      },
      setItem(_key, value) {
        return Promise.resolve(value);
      },
      removeItem(_key) {
        return Promise.resolve();
      },
    };
  };

  const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

  const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['posts'],
  };

  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [
    sagaMiddleware,
    (store) => next => action => {
      next(action);
    },
  ];
  const composeEnhancers = composeWithDevTools({});
  const enhancer =
    process.env.NODE_ENV !== 'production'
      ? composeEnhancers(applyMiddleware(...middlewares))
      : compose(applyMiddleware(...middlewares));


  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, preloadedState, enhancer);

  const persistor = persistStore(store);

  if (params.req || !params.isServer) { (store as any).sagaTask = sagaMiddleware.run(rootSaga); }
  (store as any).persistor = persistor;

  return store;
};

export default configureStore;
