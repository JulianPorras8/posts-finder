/* eslint-disable react/prop-types */
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import configureStore from 'redux-mock-store';
import theme from '../theme';

const mockStore = configureStore([]);

const initialState = {
  posts: {
    items: [{
      id: 1,
      userId: 1,
      title: 'test 1',
      body: 'post Body 1',
    }, {
      id: 2,
      userId: 1,
      title: 'test 2',
      body: 'post Body 2',
    }],
    isLoading: false,
    error: '',
    pageNumber: 1,
    posts: [],
    preSelectedPost: null,
    selectedPost: null,
  }
};
const store = mockStore(initialState);

export default function TestProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  );
}
