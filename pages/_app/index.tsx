import * as React from 'react';

import { Typography } from '@material-ui/core';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { AppInitialProps, AppProps, AppContext } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';

import App from '../home';
import configureStore from '../../src/configureStore';
import { TRootState } from '../../src/reducers';

const objectStore = configureStore();

type Props = { store: Store<TRootState> } & AppInitialProps & AppProps;

type AppPage<P = {}> = {
  (props: P): JSX.Element | null;
  getInitialProps: ({ Component, ctx }: AppContext) => Promise<AppInitialProps>;
};

export function ReduxRoot({ store, pageProps, Component }: any) {
  console.log('store', store);
  console.log('pageProps', pageProps);
  // console.log('Component', Component);
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Typography>Loading...</Typography>}
        persistor={objectStore.persistor}
      >
         <App /> 
        {/*<Component {...pageProps} />*/}
      </PersistGate>
    </Provider>
  );
}

ReduxRoot.getInitialProps = async ({ Component, ctx }: AppContext) => {
  console.log('Component', Component);
  return {
    pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) },
  };
};

export default withRedux(objectStore.createStore)(withReduxSaga(ReduxRoot));
