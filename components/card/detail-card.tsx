import React from 'react';
import styled from '@emotion/styled';

interface IProps {
  content: string;
}

const DetailCard: React.FC<IProps> = ({ content }) => {
  return (
    <StyledDetailCard>
      <h3>{content}</h3>
    </StyledDetailCard>
  );
};

export default DetailCard;

const StyledDetailCard = styled.article`
  padding: 20px 15px;
  text-align: center;
  h3 {
    margin: 0;
    cursor: default;
  }
`;
