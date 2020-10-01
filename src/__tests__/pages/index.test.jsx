// import 'jsdom-global/register';
import React from 'react';
import { render } from '@testing-library/react';

import TestProvider from '../../utils/TestProvider';

// jest.mock('redux-persist/lib/storage', () => {
//   var store = {};
//   return {
//     default: {
//       getItem: function (key) {
//         return store[key];
//       },
//       setItem: function (key, value) {
//         store[key] = value.toString();
//       },
//       clear: function () {
//         store = {};
//       },
//       removeItem: function (key) {
//         delete store[key];
//       }
//     }
//   };
// });

import Index from '../../pages/index';

describe('<Index />', () => {

  const app = render(
    <TestProvider>
      <Index />
    </TestProvider>
  );

  it('matches snapshot', () => {
    expect(app).toMatchSnapshot();
  });

  describe('<RegisterContainer />', () => {
    it('renders todo input', () => {
      expect(app.container).toBeTruthy();
    });
  });
});
