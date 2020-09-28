import * as React from 'react';

import { Typography } from '@material-ui/core';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { AppContext } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from '../../src/configureStore';
const objectStore = configureStore();

import App from '../home';

export function ReduxRoot({ store }: any) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Typography>Loading...</Typography>}
        persistor={objectStore.persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  );
}

ReduxRoot.getInitialProps = async ({ Component, ctx }: AppContext) => {
  return {
    pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) },
  };
};

export default withRedux(objectStore.createStore)(withReduxSaga(ReduxRoot));
