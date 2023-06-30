import React, { useEffect, useState } from 'react';
import play from '../../asset/play.svg';
import pause from '../../asset/pause.svg';
import { StTimer, StTimerContainer, StTimerImg } from '../../styles/timer/Timer.styles';

function Timer({ onSaveTime }) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (!isPaused) {
      setTimerInterval(
        setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000)
      );
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isPaused]);

  const handlePause = () => {
    setIsPaused((prevIsPaused) => {
      const newIsPaused = !prevIsPaused;
      if (newIsPaused) {
        clearInterval(timerInterval);
      }
      return newIsPaused;
    });
  };

  useEffect(() => {
    onSaveTime(0);
    if (!isPaused) {
      onSaveTime(time);
    } else {
      onSaveTime(time);
    }
  }, [isPaused, time, onSaveTime]);

  // console.log('#######SAVEDTIME=====> ', savedTime);

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
      <StTimer paused={isPaused.toString()}>{formatTime(time)}</StTimer>
      <StTimerImg
        src={isPaused ? play : pause}
        alt="play and pause"
        onClick={handlePause}
      ></StTimerImg>
    </StTimerContainer>
  );
}
export default Timer;
