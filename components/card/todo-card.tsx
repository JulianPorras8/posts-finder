import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import styled from '@emotion/styled';

import { Button } from '@components/button';
import { BUTTON_TYPE, COLOR, BREAKPOINT } from '@constants/index';

import { ETodoType } from '@redux/todo/todoType';

interface IProps {
  id: number;
  content: string;
}

const TodoCard: React.FC<IProps> = ({ id, content }) => {
  const dispatch = useDispatch();

  const onClickAchieveTodo = () => {
    dispatch({
      type: ETodoType.TODO_ACHIEVE_REQUEST,
      payload: { id },
    });
  };

  return (
    <StyledTodoCard>
      <Link href={`/detail/${id}`}>
        <a>
          <Content>{content}</Content>
        </a>
      </Link>
      <Button onClickHandler={onClickAchieveTodo} buttonType={BUTTON_TYPE.DONE} />
    </StyledTodoCard>
  );
};

export default TodoCard;

const StyledTodoCard = styled.article`
  grid-template-columns: auto 50px;
  height: 50px;
  background-color: ${COLOR.WHITE};
  border-radius: 5px;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.2s ease;
  }
`;

const StyledContent = styled('div')`
  padding: 12.5px 20px;
  margin: 0;
  h3 {
    margin: 0;
    height: 25px;
    overflow: hidden;
    cursor: default;

    ${BREAKPOINT} {
      width: 175px;
    }
  }
`;

const Content = ({ children }) => (
  <StyledContent>
    <h3>{children}</h3>
  </StyledContent>
);
