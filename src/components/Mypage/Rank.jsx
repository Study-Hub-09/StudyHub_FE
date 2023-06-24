import React, { useEffect, useState } from 'react';
import Arrow from '../../assets/Images/Arrow 1.svg';
import RankingChanges from './RankingChanges';
import RankingChangesTime from './RankingChangesTime';
import gold from '../../assets/Icons/gold.svg';
import silver from '../../assets/Icons/silver.svg';
import bronze from '../../assets/Icons/bronze.svg';
import {
  StContentMainLayout,
  StContentMainRank,
  StContentMainRankEx,
  StContentMainRankImg,
  StContentMainRankName,
  StContentMainRankNextAro,
  StContentMainRankNic,
  StContentMainRankTime,
  StContentMainRankTitle,
  StContentMainTitelNextEx,
} from '../../styles/mypage/Rank.styles';

function Rank({ token, topRankedList }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topRankedList.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [topRankedList]);

  const getRankingImage = (rank) => {
    if (token) {
      if (rank === 3) {
        return gold;
      } else if (rank === 1) {
        return silver;
      } else if (rank === 2) {
        return bronze;
      }
    }
    return gold;
  };

  return (
    <StContentMainRank>
      <StContentMainLayout>
        <StContentMainRankTitle>현재 공부왕</StContentMainRankTitle>
        <StContentMainRankName>
          <StContentMainRankImg src={getRankingImage(currentIndex)} alt="medal color" />
          <StContentMainRankNic>
            {/* {token ? topRankedNickname : '공부왕'} */}
            <RankingChanges topRankedList={topRankedList} />
          </StContentMainRankNic>
        </StContentMainRankName>

        <StContentMainRankEx>
          <StContentMainTitelNextEx>총 공부시간</StContentMainTitelNextEx>

          <StContentMainRankNextAro>
            <img src={Arrow} alt="Arrow" />
          </StContentMainRankNextAro>

          <StContentMainRankTime>
            {/* {totalRankTime(rankedItem?.topRankedTotalStudyTime)} */}
            <RankingChangesTime topRankedList={topRankedList} />
          </StContentMainRankTime>
        </StContentMainRankEx>
      </StContentMainLayout>
    </StContentMainRank>
  );
}

export default Rank;
