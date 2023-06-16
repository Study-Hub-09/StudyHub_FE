import React, { useState } from 'react';
import { styled } from 'styled-components';
import leftallow from '../../asset/leftallow.svg';
import rightallow from '../../asset/rightallow.svg';
import { useNavigate } from 'react-router-dom';
import ModalPortal from '../Modal/ModalPortal';
import Joinmodal from '../Joinmodal';
import { useQuery } from 'react-query';
import { getRoom } from '../../api/api';

function RoomPagination({ token }) {
  const navigate = useNavigate();

  const [isJoinModalsOpen, setIsJoinModalsOpen] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useQuery(['rooms', page], () => getRoom(page));

  const roomInfo = data?.data.content;

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const currentRoom = roomInfo[currentRoomIndex];

  const nextpageHandler = () => {
    if (currentRoomIndex < roomInfo.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1);
    } else {
      if (currentRoomIndex + 1 === roomInfo.length) {
        setPage(page + 1);
        setCurrentRoomIndex(0);
      }
    }
  };
  const prevpageHandler = () => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1);
    } else {
      if (page > 1) {
        setPage(page - 1);
        setCurrentRoomIndex(roomInfo.length - 1);
      }
    }
  };

  const openJoinModal = () => {
    setIsJoinModalsOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalsOpen(false);
  };

  return (
    <StContentMainSubStudyRoom>
      <StContentMainSubStudyRoomTM>
        <StContentMainSubStudyRoomTitle>모집 중인 스터디</StContentMainSubStudyRoomTitle>
        <StContentMainSubStudyRoomMore
          onClick={() => {
            navigate('/main');
          }}
        >
          더보기
        </StContentMainSubStudyRoomMore>
      </StContentMainSubStudyRoomTM>
      {currentRoom && token && (
        <StContentMainSubStudyRoomList>
          <StContentMainSubStudyRoomNaCa>
            <StContentMainSubStudyRoomName>
              {currentRoom.roomName}
            </StContentMainSubStudyRoomName>
            <StContentMainSubStudyRoomCa>
              {currentRoom.category}
            </StContentMainSubStudyRoomCa>
          </StContentMainSubStudyRoomNaCa>

          <StContentMainSubStudyRoomBtn onClick={openJoinModal}>
            <StContentMainSubStudyRoomBtnF>입장하기</StContentMainSubStudyRoomBtnF>
          </StContentMainSubStudyRoomBtn>
          {isJoinModalsOpen && (
            <ModalPortal>
              <Joinmodal roomData={currentRoom} onClose={closeJoinModal} />
            </ModalPortal>
          )}
        </StContentMainSubStudyRoomList>
      )}
      <Stallowbox>
        <Stallowicon src={leftallow} alt="" onClick={prevpageHandler} />
        <Stallowicon src={rightallow} alt="" onClick={nextpageHandler} />
      </Stallowbox>
    </StContentMainSubStudyRoom>
  );
}

export default RoomPagination;

const StContentMainSubStudyRoom = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60%;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  margin-top: 1.6%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomTM = styled.div`
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomTitle = styled.div`
  width: 40%;
  height: 45%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 27px;
  color: #000000;
  margin: 10px 0px 10px 25px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomMore = styled.div`
  width: 11%;
  height: 35%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 19px;
  color: #848484;
  text-decoration-line: underline;
  margin: 19px 26px 12px 0px;
  cursor: pointer;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomList = styled.div`
  width: 90%;
  height: 100%;
  background: rgba(144, 181, 76, 0.2);
  border-radius: 12px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomNaCa = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomName = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 19px;
  color: #000000;
  margin: 0px 0px 0px 23.57px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomCa = styled.div`
  width: 100%;
  height: 16px; // 변경필요
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 16px;
  color: #90b54c;
  margin: 0px 0px 0px 23.57px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 28%;
  height: 80%;
  background: #fefefefe;
  border: 1px solid #bfbfbfbf;
  border-radius: 30px;
  margin-right: 10px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainSubStudyRoomBtnF = styled.button`
  width: 60%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 0.938rem;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #00573f;
  /* border: 1px solid #8cacff; */
`;
const Stallowbox = styled.div`
  height: 33%;
  width: 8%;
  padding: 15px 10px;
  margin-left: 348px;
  display: flex;
  justify-content: end;
  gap: 21px;
  /* border: 1px solid #8cacff; */
`;
const Stallowicon = styled.img`
  cursor: pointer;
`;
