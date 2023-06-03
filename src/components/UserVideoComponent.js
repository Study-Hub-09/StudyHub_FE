import React from 'react';
import OpenViduVideoComponent from './OvVideo';
// import './UserVideo.css';
import styled from '@emotion/styled';

const UserVideoComponent = ({ streamManager }) => {
  const getNicknameTag = () => {
    // 사용자의 닉네임을 가져옵니다.
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };
  console.log(streamManager.stream);
  return (
    <div>
      {streamManager !== undefined ? (
        <Stcambox>
          <OpenViduVideoComponent streamManager={streamManager} />
          <div>
            <Stcamboxname>{getNicknameTag()}</Stcamboxname>
          </div>
        </Stcambox>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;

const Stcambox = styled.div`
  width: 547px;
  height: 308px;
  background-color: black;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 14px;
  background-color: black;
  position: relative;
`;
const Stcamboxname = styled.div`
  width: 68px;
  height: 30px;
  background-color: #424242;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
  font-weight: 500;
  position: absolute;
`;
