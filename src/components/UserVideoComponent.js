import React from 'react';
import OpenViduVideoComponent from './OvVideo';
// import '../components/UserVideo.css';
import { styled, css } from 'styled-components';
import viewmic from '../asset/viewmic.svg';
import camuser from '../asset/camoffuser.svg';

const UserVideoComponent = ({ streamManager, userName, audioEnabled, videoEnabled }) => {
  //   const getNicknameTag = () => {
  // 사용자의 닉네임을 가져옵니다.
  //     return JSON.parse(streamManager.stream.connection.data).clientData;
  //   };
  //   console.log(streamManager.stream);
  return (
    <div>
      {streamManager !== undefined ? (
        <Stcambox>
          <Stcamboxname>{userName}</Stcamboxname>
          {videoEnabled ? (
            <OpenViduVideoComponent streamManager={streamManager} />
          ) : (
            <StCamboximage>
              <img src={camuser} alt="" />
            </StCamboximage>
          )}
          {audioEnabled ? (
            ''
          ) : (
            <StmicMuteIcon src={viewmic} alt="" width={36} height={36} />
          )}
        </Stcambox>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;

const Stcambox = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  background-color: #d8deca;
  position: relative;
`;
const Stcamboxname = styled.div`
  /* width: 68px; */
  height: 14%;
  background-color: #424242;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  position: absolute;
  bottom: 13.11px;
  left: 14.5px;
  padding: 0px 13px;
  z-index: 1;
`;
const StmicMuteIcon = styled.img`
  position: absolute;
  right: 7.99px;
  bottom: 8.11px;
`;
const StCamboximage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 14% 0%;
`;
