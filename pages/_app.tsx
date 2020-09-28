import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { AppInitialProps, AppProps, AppContext } from 'next/app';
import Head from 'next/head';

import configureStore from '../redux/configureStore';
import { TRootState } from '@redux/rootReducer';

type Props = { store: Store<TRootState> } & AppInitialProps & AppProps;

type AppPage<P = {}> = {
  (props: P): JSX.Element | null;
  getInitialProps: ({ Component, ctx }: AppContext) => Promise<AppInitialProps>;
};

const App: AppPage<Props> = ({ store, pageProps, Component }) => {
  return (
    <>
      <Head>
        <title>typescript-react-nextjs-redux-starter</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  return {
    pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) },
  };
};
export default withRedux(configureStore)(withReduxSaga(App));

