import React from 'react';
import { styled } from 'styled-components';
import Arrow from '../../assets/Images/Arrow 1.svg';
import nSeed from '../../assets/Icons/nSeed.png';
import nSprout from '../../assets/Icons/nSprout.png';
import nSapling from '../../assets/Icons/nSapling.png';
import nTree from '../../assets/Icons/nTree.png';
import nBigTree from '../../assets/Icons/nBigTree.png';
import nCenturyTree from '../../assets/Icons/nCenturyTree.png';
import nWorldTree from '../../assets/Icons/nWorldTree.png';

function Rank({
  totalRankTime,
  topRankedNickname,
  topRankedTotalStudyTime,
  token,
  topRankedTitle,
}) {
  const getRankingImage = () => {
    // 랭킹 이미지를 랭킹에 따라 매핑합니다.
    if (token) {
      if (topRankedTitle === '씨앗') {
        return nSeed;
      } else if (topRankedTitle === '새싹') {
        return nSprout;
      } else if (topRankedTitle === '잎줄기') {
        return nSapling;
      } else if (topRankedTitle === '묘목') {
        return nTree;
      } else if (topRankedTitle === '나무') {
        return nBigTree;
      } else if (topRankedTitle === '거목') {
        return nCenturyTree;
      } else if (topRankedTitle === '세계수') {
        return nWorldTree;
      }
    }
    return nSeed;
  };

  return (
    <StContentMainRank>
      <StContentMainRankTitle>전체 등급</StContentMainRankTitle>

      <StContentMainRankName>
        <StContentMainRankImg src={getRankingImage()} alt="오류" />
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
  width: 95%;
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
  width: 40%;
  height: 17%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1rem;
  color: #848484;
  margin-left: 1.125rem;
  /* border: 1px solid #8cacff; */
`;
const StContentMainRankName = styled.div`
  width: 80%;
  height: 40%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.563rem;
  color: #303031;
  margin: 0.313rem 0rem 0rem 1.125rem;
  display: flex;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainRankImg = styled.img`
  width: 25%;
  height: 70%;
`;
const StContentMainRankNic = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.563rem;
  color: #303031;
  margin: 0rem 0rem 0rem 0.313rem;
  display: flex;
  align-items: center;
`;
const StContentMainRankEx = styled.div`
  width: 80%;
  height: 22%;
  margin-left: 1.125rem;
  display: flex;
  align-items: baseline;
  /* border: 1px solid #8cacff; */
`;
const StContentMainRankNextAro = styled.div`
  box-sizing: border-box;
  margin: 0rem 0.188rem 0rem 0rem;
`;
const StContentMainRankTime = styled.div`
  width: 40%;
  height: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1.188rem;
  color: #90b54c;
  /* border: 1px solid #8cacff; */
`;
