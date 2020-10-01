/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import theme from '../theme';

export default function TestProvider(store) {
  return ({ children }) => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
}
