import React, { useEffect, useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import { Subscriber } from 'openvidu-browser';
import styled from 'styled-components';
import viewmic from '../asset/viewmic.svg';
import camuser from '../asset/camoffuser.svg';

const UserVideoComponent = ({ streamManager, audioEnabled, videoEnabled }) => {
  console.log('streammadgasdfadfasdf>> ', streamManager);
  // console.log('audioEnabled 제발 >> ', audioEnabled);
  // console.log('videoEnabled 좀!!! >> ', videoEnabled);
  const member = localStorage.getItem('member');

  // 유저 닉네임 태그 함수
  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  const user = getNicknameTag() === member;
  const subscriber = JSON.parse(streamManager.stream.connection.data).clientData;
  console.log('ldjkfoasdjfoaisdj ', subscriber);

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
          {!audioEnabled && user && <StmicMuteIcon src={viewmic} alt="audio icon" />}
          {!videoEnabled && user && (
            <StUserCam>
              <img src={camuser} alt="unabled video user icon" />
            </StUserCam>
          )}
          {/* {(!videoEnabled && getNicknameTag() === !member && (
            <StUserCam>
              <img src={camuser} alt="unabled video user icon" />
            </StUserCam>
          )) ||
            (videoEnabled && getNicknameTag() === !member && (
              <StUserCam>
                <img src={camuser} alt="unabled video user icon" />
              </StUserCam>
            ))} */}
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
  z-index: 2;
`;
const StmicMuteIcon = styled.img`
  position: absolute;
  right: 7.99px;
  bottom: 8.11px;
  z-index: 1;
`;

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
