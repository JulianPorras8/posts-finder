import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from '@redux/configureStore';
import Index from '@pages/index';
import RegisterContainer from '@containers/register-container';
import { TodoCard } from '@components/card';

describe('<Index />', () => {
  const initialState = {
    todo: {
      todoDatas: [
        { id: 0, content: '1' },
        { id: 1, content: '2' },
      ],
    },
  };

  const wrapper = mount(
    <Provider store={configureStore(initialState, { isServer: false, req: null })}>
      <Index />
    </Provider>,
  );

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('<RegisterContainer />', () => {
    const registerContainerWrapper = wrapper.find(RegisterContainer);
    it('renders todo input', () => {
      expect(registerContainerWrapper.find('input')).toHaveLength(1);
    });

    it('renders submit button', () => {
      expect(registerContainerWrapper.find('button')).toHaveLength(1);
    });
  });

  describe('<ListContainer />', () => {
    const todoCardWrapper = wrapper.find(TodoCard);
    it('renders TodoCard components', () => {
      expect(todoCardWrapper).toHaveLength(2);
    });
  });
});
