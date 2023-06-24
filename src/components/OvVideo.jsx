import React, { useEffect, useRef } from 'react';
import { Stvideo } from '../styles/Room.styles';

const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <Stvideo autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;
