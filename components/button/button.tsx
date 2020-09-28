import React from 'react';
import styled from '@emotion/styled';

import { COLOR, BUTTON_TYPE } from '@constants/index';

interface IStyleProps {
  buttonColor?: COLOR;
}

interface IProps extends IStyleProps {
  onClickHandler?: (event?) => void;
  buttonType: BUTTON_TYPE;
}

const Button: React.FC<IProps> = ({ onClickHandler, buttonType, buttonColor }) => {
  return (
    <StyledButton onClick={onClickHandler} buttonColor={buttonColor}>
      <i className="material-icons">{buttonType}</i>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<IStyleProps>`
  margin: auto;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: ${props => (props.buttonColor ? props.buttonColor : COLOR.CARROT)};
  background-color: inherit;
  &:focus {
    outline: none;
  }
`;
