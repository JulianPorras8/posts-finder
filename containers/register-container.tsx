import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { ContentInput } from '@components/input';
import { Button } from '@components/button';
import { BREAKPOINT, COLOR, BUTTON_TYPE } from '@constants/index';

import { ETodoType } from '@redux/todo/todoType';

const RegisterContainer: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const dispatch = useDispatch();

  const onChangeSetContent = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.currentTarget.value);

  const checkKeyDownAndIsEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key && event.key !== 'Enter') return false;
    return true;
  };

  const checkIsContentLengthBelowZero = () => {
    if (content.trim().length <= 0) return false;
    return true;
  };

  const initContent = () => setContent('');

  const onSubmitToDo = event => {
    if (!checkKeyDownAndIsEnter(event)) return;
    if (!checkIsContentLengthBelowZero()) return;
    initContent();
    dispatch({
      type: ETodoType.TODO_REGISTER_REQUEST,
      payload: { content: content.trim() },
    });
  };

  return (
    <RegisterSection>
      <RegisterDiv>
        <ContentInput content={content} onChangeHandler={onChangeSetContent} onKeyDownHandler={onSubmitToDo} />
        <Button
          onClickHandler={onSubmitToDo}
          buttonType={BUTTON_TYPE.CREATE}
          buttonColor={content.trim().length <= 0 && COLOR.SILVER}
        />
      </RegisterDiv>
    </RegisterSection>
  );
};

export default RegisterContainer;

const RegisterSection = styled.section`
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
  }
`;

const RegisterDiv = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 70px;
  margin: auto 50px;
  border: 1px solid ${COLOR.CARROT};

  ${BREAKPOINT} {
    grid-template-columns: 263px 50px;
    justify-content: center;
    margin: 30px;
  }
`;
