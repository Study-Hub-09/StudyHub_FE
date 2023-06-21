import React, { useState, useEffect } from 'react';

const RankingChanges = ({ topRankedList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topRankedList.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [topRankedList]);

  const getRankingString = (index) => {
    return topRankedList[index]?.nickname || '공부왕';
  };

  return (
    <div>
      <ul>
        <li>{getRankingString(currentIndex)}</li>
      </ul>
    </div>
  );
};

export default RankingChanges;
