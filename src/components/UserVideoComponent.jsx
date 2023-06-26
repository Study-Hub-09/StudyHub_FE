import React, { useEffect, useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import viewmic from '../asset/viewmic.svg';
import camuser from '../asset/camoffuser.svg';
import {
  Stcambox,
  Stcamboxname,
  StmicMuteIcon,
  StUserCam,
  StUserimg,
} from '../styles/Room.styles';

const UserVideoComponent = ({ streamManager }) => {
  const [userAudio, setUserAudio] = useState(streamManager.stream.audioActive);
  const [userVideo, setUserVideo] = useState(streamManager.stream.videoActive);

  // 유저 닉네임 태그 함수
  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  // 스트림매니저 (발행자/구독자) 오디오 유무 확인
  useEffect(() => {
    setUserAudio(streamManager.stream.audioActive);
  }, [streamManager.stream.audioActive]);

  // 스트림매니저 (발행자/구독자) 비디오 유무 확인
  useEffect(() => {
    setUserVideo(streamManager.stream.videoActive);
  }, [streamManager.stream.videoActive]);

  return (
    <div>
      {streamManager !== undefined ? (
        <Stcambox>
          <Stcamboxname>{getNicknameTag()}</Stcamboxname>
          <OpenViduVideoComponent streamManager={streamManager} />
          {!userAudio && (
            <StmicMuteIcon
              src={viewmic}
              alt="Rounded Gray Background, White Mic With Slash"
            />
          )}

          {!userVideo && (
            <StUserCam>
              <StUserimg
                src={camuser}
                alt="Light Green Background, Rounded White Background With Green User Icon"
              />
            </StUserCam>
          )}
        </Stcambox>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
