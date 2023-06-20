import React, { useEffect, useRef, useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import styled from 'styled-components';
import viewmic from '../asset/viewmic.svg';
import camuser from '../asset/camoffuser.svg';

const UserVideoComponent = ({ streamManager, audioEnabled, videoEnabled }) => {
  console.log('마이크 시파>>> ', audioEnabled);

  const member = localStorage.getItem('member');
  console.log('member>>> ', member);
  // 유저 닉네임 태그 함수
  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  console.log('getNicknameTage>>> ', getNicknameTag());

  return (
    <div>
      {streamManager !== undefined ? (
        <Stcambox>
          <Stcamboxname>{getNicknameTag()}</Stcamboxname>

          <OpenViduVideoComponent
            streamManager={streamManager}
            audioEnabled={audioEnabled}
            videoEnabled={videoEnabled}
          />
          {!audioEnabled && getNicknameTag() === member && (
            <StmicMuteIcon src={viewmic} alt="audio icon" />
          )}
          {!videoEnabled && getNicknameTag() === member && (
            <StUserCam>
              <img src={camuser} alt="unabled video user icon" />
            </StUserCam>
          )}
        </Stcambox>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;

const Stcambox = styled.div`
  /* border: 1px solid red; */
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
  font-size: 0.8rem;
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
// const StCamboximage = styled.img`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   padding: 14% 0%;
//   z-index: 1;
// `;

const StUserCam = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d8deca;
  position: absolute;
`;
