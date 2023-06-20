import React, { useState, useEffect } from 'react';

const RankingChangesTime = ({ totalRankTime, topRankedTotalStudyTime }) => {
  const [currentRank, setCurrentRank] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRank((prevRank) => {
        if (prevRank === 3) return 1;
        return prevRank + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getRankingString = (ranktime) => {
    switch (ranktime) {
      case 1:
        return `${totalRankTime(topRankedTotalStudyTime) || ''}`;
      case 2:
        return `${totalRankTime(topRankedTotalStudyTime) || ''}`;
      case 3:
        return `${totalRankTime(topRankedTotalStudyTime) || ''}`;
      default:
        return '';
    }
  };

  return (
    <div>
      <ul>
        <li>{getRankingString(currentRank)}</li>
      </ul>
    </div>
  );
};

export default RankingChangesTime;
