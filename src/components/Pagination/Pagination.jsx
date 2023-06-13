import React from 'react';
import { styled } from 'styled-components';
import leftallow from '../../asset/leftallow.svg';
import rightallow from '../../asset/rightallow.svg';

function Pagination({ prevpageHandler, nextpageHandler }) {
  return (
    <Stallowbox>
      <Stallowicon src={leftallow} alt="" onClick={prevpageHandler} />
      <Stallowicon src={rightallow} alt="" onClick={nextpageHandler} />
    </Stallowbox>
  );
}

export default React.memo(Pagination);

const Stallowbox = styled.div`
  width: 72px;
  padding: 15px 10px;
  margin-left: 348px;
  display: flex;
  justify-content: end;
  gap: 21px;
`;

const Stallowicon = styled.img`
  cursor: pointer;
`;
