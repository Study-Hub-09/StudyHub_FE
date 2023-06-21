import React, { useState, useEffect } from 'react';

const RankingChangesTime = ({ topRankedList }) => {
  const [currentRank, setCurrentRank] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRank((prevRank) => (prevRank % topRankedList.length) + 1);
    }, 2000);

    return () => clearInterval(timer);
  }, [topRankedList]);

  const getRankingString = (ranktime) => {
    switch (ranktime) {
      case 1:
        return `${totalRankTime(topRankedList[1]?.totalStudyTime) || '00:00:00'}`;
      case 2:
        return `${totalRankTime(topRankedList[2]?.totalStudyTime) || '00:00:00'}`;
      case 3:
        return `${totalRankTime(topRankedList[0]?.totalStudyTime) || '00:00:00'}`;
      default:
        return '00:00:00';
    }
  };

  const totalRankTime = (ranktotalStudyTime) => {
    if (typeof ranktotalStudyTime !== 'number') {
      return '00:00:00';
    }

    const hours = Math.floor(ranktotalStudyTime / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((ranktotalStudyTime % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (ranktotalStudyTime % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
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
