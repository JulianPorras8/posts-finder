import * as localforage from 'localforage';
// import storage from 'redux-persist/lib/storage';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// Reducers
import rootReducer from './reducers';

// Sagas
import sagas from './sagas';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// tslint:disable-next-line: variable-name
const ConfigStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const createNoopStorage = () => {
    return {
      getItem(_: any) {
        return Promise.resolve(null);
      },
      setItem(_: any, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_: any) {
        return Promise.resolve();
      },
    };
  };

  const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

  const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    storage,
  };


  const logger = (createLogger as any)();

  const dev = process.env.NODE_ENV === 'development';

  let middleware = dev ? applyMiddleware(sagaMiddleware, thunk, logger) : applyMiddleware(sagaMiddleware, thunk);
  if (dev) {
    middleware = composeWithDevTools(middleware);
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, {}, middleware) as any;
  store.sagaTask = sagaMiddleware.run(sagas);

  const persistor = persistStore(store);

  return { createStore: () => store, persistor };
};

export default ConfigStore;
