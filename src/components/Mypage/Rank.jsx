import React from 'react';
import { styled } from 'styled-components';
import Arrow from '../../assets/Images/Arrow 1.svg';
import Seed from '../../assets/Icons/Seed.png';

function Rank({ totalRankTime, topRankedNickname, topRankedTotalStudyTime, token }) {
  return (
    <StContentMainRank>
      <StContentMainRankTitle>전체 등급</StContentMainRankTitle>

      <StContentMainRankName>
        <StContentMainRankImg src={Seed} alt="오류" />
        <StContentMainRankNic>
          {token ? topRankedNickname : '공부왕'}
        </StContentMainRankNic>
      </StContentMainRankName>

      <StContentMainRankEx>
        <StContentMainRankNextAro>
          <img src={Arrow} alt="오류" />
        </StContentMainRankNextAro>
        <StContentMainRankTime>
          {totalRankTime(topRankedTotalStudyTime)}
        </StContentMainRankTime>
      </StContentMainRankEx>
    </StContentMainRank>
  );
}

export default Rank;

const StContentMainRank = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainRankTitle = styled.div`
  width: 25%;
  height: 17%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 16px;
  color: #848484;
  margin-left: 18px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainRankName = styled.div`
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
const StContentMainRankImg = styled.img`
  width: 30%;
  height: 100%;
`;
const StContentMainRankNic = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 25px;
  color: #303031;
  margin: 0px 0px 0px 5px;
  display: flex;
`;
const StContentMainRankEx = styled.div`
  width: 80%;
  height: 22%;
  margin-left: 18px;
  display: flex;
  align-items: baseline;
  /* border: 1px solid #8cacff; */
`;
const StContentMainRankNextAro = styled.div`
  box-sizing: border-box;
  margin: 0px 8px 0px 0px;
`;
const StContentMainRankTime = styled.div`
  width: 40%;
  height: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 19px;
  color: #90b54c;
  /* border: 1px solid #8cacff; */
`;
