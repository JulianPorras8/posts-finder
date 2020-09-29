import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { AppInitialProps, AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { Persistor } from 'redux-persist';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import configureStore from '../redux/configureStore';
import { TRootState } from '@redux/rootReducer';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6573c3',
      main: '#3f51b5',
      dark: '#2c387e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
      contrastText: '#fff',
    },
  },
});

interface IStore extends Store<TRootState> {
  persistor: Persistor;
}

type Props = { store: IStore } & AppInitialProps & AppProps;

type AppPage<P = {}> = {
  (props: P): JSX.Element | null;
  getInitialProps: ({ Component, ctx }: AppContext) => Promise<AppInitialProps>;
};

const App: AppPage<Props> = ({ store, pageProps, Component }) => {
  return (
    <>
      <Head>
        <title>Post Finder</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          {typeof window !== 'undefined' && <PersistGate
            loading={<div>Loading...</div>}
            persistor={store.persistor}
          >
            <Component {...pageProps} />
          </PersistGate>}
        </Provider>
      </ThemeProvider>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  return {
    pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) },
  };
};
export default withRedux(configureStore)(withReduxSaga(App));

