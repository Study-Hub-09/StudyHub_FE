import React from 'react';
import { styled } from 'styled-components';
import Arrow from '../../assets/Images/Arrow 1.svg';
import Seed from '../../assets/Icons/Seed.png';

function StudyTitle({ nextRankTime, nextGradeRemainingTime, title, token }) {
  return (
    <StContentMainTitel>
      <StContentMainMyTitel>내 칭호</StContentMainMyTitel>

      <StContentMainTitelName>
        <StContentMainTitelImg src={Seed} alt="오류" />
        <StContentMainTitelN>{token ? title : '씨앗'}</StContentMainTitelN>
      </StContentMainTitelName>

      <StContentMainTitelEx>
        <StContentMainTitelNextEx>다음 등급까지</StContentMainTitelNextEx>

        <StContentMainTitelNextAro>
          <img src={Arrow} alt="오류" />
        </StContentMainTitelNextAro>
        <StContentMainTitelNextTime>
          {nextRankTime(nextGradeRemainingTime)}
        </StContentMainTitelNextTime>
      </StContentMainTitelEx>
    </StContentMainTitel>
  );
}

export default StudyTitle;

const StContentMainTitel = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  margin-right: 1.7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainMyTitel = styled.div`
  width: 20%;
  height: 17%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 16px;
  color: #848484;
  margin-left: 18px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelName = styled.div`
  width: 40%;
  height: 25%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 25px;
  color: #303031;
  margin: 7px 0px 7px 18px;
  display: flex;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelImg = styled.img`
  width: 30%;
  height: 100%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelN = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 25px;
  color: #303031;
  margin: 0px 0px 0px 5px;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelEx = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  height: 22%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelNextEx = styled.div`
  width: 42%;
  height: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 19px;
  color: #848484;
  margin-left: 18px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelNextAro = styled.div`
  box-sizing: border-box;
  margin: 0px 8px 0px 9px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelNextTime = styled.div`
  width: 33%;
  height: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 19px;
  color: #90b54c;
  /* border: 1px solid #8cacff; */
`;
