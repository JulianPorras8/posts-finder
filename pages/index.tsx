import React from 'react';
import { NextJSContext } from 'next-redux-wrapper';
import styled from '@emotion/styled';

import RegisterContainer from '@containers/register-container';
import ListContainer from '@containers/list-container';

import { ETodoType } from '@redux/todo/todoType';
import BREAKPOINTS from '@constants/mediaquery';

const Index = () => {
  return (
    <Main>
      <RegisterContainer />
      <ListContainer />
    </Main>
  );
};

Index.getInitialProps = async ({ store }: NextJSContext) => {
  store.dispatch({
    type: ETodoType.TODO_LOAD_REQUEST,
  });

  return {};
};

export default Index;

const Main = styled.main`
  ${BREAKPOINTS} {
    display: grid;
    grid-template-rows: 112px 555px;
  }
`;