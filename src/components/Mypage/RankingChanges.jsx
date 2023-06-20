import React, { useState, useEffect } from 'react';

const RankingChanges = ({ topRankedNickname }) => {
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

  const getRankingString = (rank) => {
    switch (rank) {
      case 1:
        // return `1. ${topRankedNickname || '공부왕'}`;
        return `${topRankedNickname || '공부왕'}`;
      case 2:
        return `${topRankedNickname || '공부왕'}`;
      case 3:
        return `${topRankedNickname || '공부왕'}`;
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

export default RankingChanges;
