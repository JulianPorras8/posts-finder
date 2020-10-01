import React from 'react';

// Modules
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import Head from 'next/head';

// Material components
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

// Theme
import theme from '../theme';

// Store configuration
import configureStore from '../store';

function DefaultComponent({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

const App = ({ store, pageProps, Component = DefaultComponent }) => {
  return (
    <>
      <Head>
        <title>Post Finder</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          key='viewport'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <PersistGate
            loading={<div>Loading...</div>}
            persistor={store.__PERSISTOR}
          >
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
};

/* istanbul ignore next */
App.getInitialProps = async ({ Component, ctx }) => {
  return {
    pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) },
  };
};
export default withRedux(configureStore)(withReduxSaga(App));
