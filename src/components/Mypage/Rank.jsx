import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Arrow from '../../assets/Images/Arrow 1.svg';
import RankingChanges from './RankingChanges';
import RankingChangesTime from './RankingChangesTime';
import gold from '../../assets/Icons/gold.svg';
import silver from '../../assets/Icons/silver.svg';
import bronze from '../../assets/Icons/bronze.svg';

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
          <StContentMainRankImg src={getRankingImage(currentIndex)} alt="오류" />
          <StContentMainRankNic>
            {/* {token ? topRankedNickname : '공부왕'} */}
            <RankingChanges topRankedList={topRankedList} />
          </StContentMainRankNic>
        </StContentMainRankName>

        <StContentMainRankEx>
          <StContentMainTitelNextEx>총 공부시간</StContentMainTitelNextEx>

          <StContentMainRankNextAro>
            <img src={Arrow} alt="오류" />
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
const StContentMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 0px 0px 10px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainRankTitle = styled.div`
  width: 49%;
  height: 17%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1rem;
  color: #848484;
  padding: 0px 0px 20px 0px;
  /* margin-left: 1.125rem; */
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
  /* margin: 0.313rem 0rem 0rem 1.125rem; */
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
  font-size: 1.1111vw;
  line-height: 1.563rem;
  color: #303031;
  /* margin: 0rem 0rem 0rem 0.313rem; */
  display: flex;
  align-items: center;
`;
const StContentMainRankEx = styled.div`
  width: 100%;
  height: 22%;
  /* margin-left: 1.125rem; */
  display: flex;
  align-items: baseline;
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
const StContentMainRankNextAro = styled.div`
  box-sizing: border-box;
  padding: 0px 8px 0px 1px;
  /* margin: 0rem 0.188rem 0rem 0rem; */
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
