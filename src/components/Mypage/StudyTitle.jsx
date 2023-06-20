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

function StudyTitle({ nextRankTime, nextGradeRemainingTime, title, token }) {
  const getRankingImage = () => {
    // 랭킹 이미지를 랭킹에 따라 매핑합니다.
    if (token) {
      if (title === '씨앗') {
        return nSeed;
      } else if (title === '새싹') {
        return nSprout;
      } else if (title === '잎줄기') {
        return nSapling;
      } else if (title === '묘목') {
        return nTree;
      } else if (title === '나무') {
        return nBigTree;
      } else if (title === '거목') {
        return nCenturyTree;
      } else if (title === '세계수') {
        return nWorldTree;
      }
    }
    return nSeed;
  };

  const getRankingTitle = () => {
    // 랭킹 이미지를 랭킹에 따라 매핑합니다.
    if (token) {
      if (title === '씨앗') {
        return '씨앗';
      } else if (title === '새싹') {
        return '새싹';
      } else if (title === '잎줄기') {
        return '잎줄기';
      } else if (title === '묘목') {
        return '묘목';
      } else if (title === '나무') {
        return '나무';
      } else if (title === '거목') {
        return '거목';
      } else if (title === '세계수') {
        return '세계수';
      }
    }
    return '씨앗';
  };

  return (
    <StContentMainTitel>
      <StContentMainLayout>
        <StContentMainMyTitel>내 칭호</StContentMainMyTitel>

        <StContentMainTitelName>
          <StContentMainTitelImg src={getRankingImage()} alt="오류" />
          <StContentMainTitelN>{getRankingTitle()}</StContentMainTitelN>
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
      </StContentMainLayout>
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
const StContentMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 0px 0px 10px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainMyTitel = styled.div`
  width: 30%;
  height: 17%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1rem;
  color: #848484;
  padding: 0px 0px 15px 0px;
  /* margin-left: 1.125rem; */
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelName = styled.div`
  width: 80%;
  height: 40%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.563rem;
  color: #303031;
  /* margin: 0.313rem 0rem 0rem 1.125rem; */
  display: flex;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelImg = styled.img`
  width: 20%;
  height: 70%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelN = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.563rem;
  color: #303031;
  /* margin: 0rem 0rem 0rem 0.313rem; */
  display: flex;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelEx = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  height: 18%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelNextEx = styled.div`
  width: 48%;
  height: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1.188rem;
  color: #848484;
  /* margin-left: 1.125rem; */
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelNextAro = styled.div`
  box-sizing: border-box;
  padding: 0px 6px 0px 2px;
  /* margin: 0rem 0.188rem 0rem 0.188rem; */
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelNextTime = styled.div`
  width: 33%;
  height: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1.188rem;
  color: #90b54c;
  /* border: 1px solid #8cacff; */
`;
