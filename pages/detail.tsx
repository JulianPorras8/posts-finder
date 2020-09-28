import React from 'react';
import { NextJSContext } from 'next-redux-wrapper';
import styled from '@emotion/styled';

import DetailContainer from '@containers/detail-container';

import { ETodoType } from '@redux/todo/todoType';

const Detail = ({ id }) => {
  return (
    <Main>
      <DetailContainer id={id} />
    </Main>
  );
};

Detail.getInitialProps = ({ store, query }: NextJSContext) => {
  store.dispatch({
    type: ETodoType.TODO_LOAD_REQUEST,
  });

  return { id: query.id };
};

export default Detail;

const Main = styled.main`
  display: grid;
  justify-content: center;
  align-items: center;
`;
