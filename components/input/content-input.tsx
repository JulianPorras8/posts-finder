import React from 'react';
import styled from '@emotion/styled';

import { BREAKPOINT } from '@constants/index';

interface IProps {
  content: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDownHandler: (event?) => void;
}

const ContentInput: React.FC<IProps> = ({ content, onChangeHandler, onKeyDownHandler }) => {
  return <StyledContentInput type="text" value={content} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />;
};

export default ContentInput;

const StyledContentInput = styled.input`
  padding: 10px 20px;
  height: 60px;
  border: none;
  font-size: 24px;
  font-weight: bold;
  outline: none;

  ${BREAKPOINT} {
    padding: 10px;
    height: 50px;
    font-size: 20px;
  }
`;
