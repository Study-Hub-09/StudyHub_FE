import React, { useEffect, useState } from 'react';
import play from '../../asset/play.svg';
import pause from '../../asset/pause.svg';
import { styled } from 'styled-components';

function Timer() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerlog, setTimerlog] = useState(null);

  useEffect(() => {
    if (!isPaused) {
      setTimerlog(
        setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000)
      );
    } else if (timerlog) {
      clearInterval(timerlog);
    }

    return () => {
      clearInterval(timerlog);
    };
  }, [isPaused]);

  const handlePause = () => {
    setIsPaused((isPaused) => !isPaused);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <StTimerContainer>
      <StTimer isPaused={isPaused}>{formatTime(time)}</StTimer>
      <StTimerImg src={isPaused ? play : pause} alt="" onClick={handlePause}></StTimerImg>
    </StTimerContainer>
  );
}

export default Timer;

const StTimerContainer = styled.div`
  width: 272px;
  height: 71px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StTimer = styled.div`
  width: 209px;
  height: 71px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 52px;
  line-height: 71px;
  margin-right: 30px;
  color: #00573f;
  ${({ isPaused }) =>
    !isPaused &&
    `
    color: #ea4335;
  `}
`;
const StTimerImg = styled.img`
  width: 48px;
  height: 48px;
  cursor: pointer;
`;
