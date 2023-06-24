import React from 'react';
import Arrow from '../../assets/Images/Arrow 1.svg';
import nSeed from '../../assets/Icons/nSeed.png';
import nSprout from '../../assets/Icons/nSprout.png';
import nSapling from '../../assets/Icons/nSapling.png';
import nTree from '../../assets/Icons/nTree.png';
import nBigTree from '../../assets/Icons/nBigTree.png';
import nCenturyTree from '../../assets/Icons/nCenturyTree.png';
import nWorldTree from '../../assets/Icons/nWorldTree.png';
import {
  StContentMainLayout,
  StContentMainMyTitel,
  StContentMainTitel,
  StContentMainTitelEx,
  StContentMainTitelImg,
  StContentMainTitelN,
  StContentMainTitelName,
  StContentMainTitelNextAro,
  StContentMainTitelNextEx,
  StContentMainTitelNextTime,
} from '../../styles/mypage/Studytitle.styles';

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
          <StContentMainTitelImg src={getRankingImage()} alt="rank image" />
          <StContentMainTitelN>{getRankingTitle()}</StContentMainTitelN>
        </StContentMainTitelName>

        <StContentMainTitelEx>
          <StContentMainTitelNextEx>다음 등급까지</StContentMainTitelNextEx>

          <StContentMainTitelNextAro>
            <img src={Arrow} alt="Arrow" />
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
