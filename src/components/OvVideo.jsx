import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const OpenViduVideoComponent = ({ streamManager, audioEnabled, videoEnabled }) => {
  // console.log('audioEnabled OVC >> ', audioEnabled);
  // console.log('videoEnabled OVC >> ', videoEnabled);
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <Stvideo autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;

const Stvideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
