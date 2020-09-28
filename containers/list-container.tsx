import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { TodoCard } from '@components/card';
import { COLOR, BREAKPOINT } from '@constants/index';

import { TRootState } from '@redux/rootReducer';

const ListContainer: React.FC = () => {
  const { todoDatas } = useSelector((state: TRootState) => state.todo);

  return (
    <ListSection>
      <ListDiv>
        {todoDatas.map(todoData => (
          <TodoCard key={todoData.id} id={todoData.id} content={todoData.content} />
        ))}
      </ListDiv>
    </ListSection>
  );
};

export default ListContainer;

const ListSection = styled.section`
  justify-content: center;
  align-items: flex-start;
  grid-template-columns: 1fr;
  margin: 3% auto;
  min-width: 500px;
  max-width: 900px;

  ${BREAKPOINT} {
    margin: auto;
    min-width: 375px;
    max-width: 375px;
    height: 100%;
  }
`;

const ListDiv = styled.div`
  display: grid;
  align-items: flex-start;
  grid-auto-rows: 50px;
  row-gap: 20px;
  margin: 0 50px;
  padding: 40px 20px;
  border: 5px solid ${COLOR.CLOUDS};
  border-radius: 10px;
  background-color: ${COLOR.CLOUDS};

  ${BREAKPOINT} {
    overflow-y: scroll;
    padding: 20px;
    width: 315px;
    height: 520px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
