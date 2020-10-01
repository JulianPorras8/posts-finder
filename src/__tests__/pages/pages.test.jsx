import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import TestProvider from '../../utils/TestProvider';
import Index from '../../pages/index';
import HealthCheck from '../../pages/healthcheck';
import App from '../../pages/_app';
import rootSaga from '../../sagas';

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureStore([sagaMiddleware]);

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

store.sagaTask = sagaMiddleware.run(rootSaga);

const Provider = TestProvider(store);

describe('<App />', () => {

  const app = render(
    <Provider>
      <App />
    </Provider>
  );

  it('matches snapshot', async () => {
    expect(app).toMatchSnapshot();
  });
})

describe('<Index />', () => {

  const index = render(
    <Provider>
      <Index />
    </Provider>
  );

  it('matches snapshot', async () => {
    expect(index).toMatchSnapshot();
  });

  describe('<Container />', () => {
    it('renders the container', () => {
      expect(index.container).toBeTruthy();
    });
  });

});

describe('<HealthCheck />', () => {
  const healthCheck = render(
    <HealthCheck />
  );
  it('matches snapshot', async () => {
    expect(healthCheck).toMatchSnapshot();
  });
});


