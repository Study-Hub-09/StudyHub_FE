import React, { useState } from 'react';
import leftallow from '../../asset/leftallow.svg';
import rightallow from '../../asset/rightallow.svg';
import { useNavigate } from 'react-router-dom';
import ModalPortal from '../Modal/ModalPortal';
import Joinmodal from '../Joinmodal';
import { useRoomData } from '../Customhook';
import {
  StContentMainSubStudyLayout,
  StContentMainSubStudyRoom,
  StContentMainSubStudyRoomBtn,
  StContentMainSubStudyRoomBtnF,
  StContentMainSubStudyRoomCa,
  StContentMainSubStudyRoomList,
  StContentMainSubStudyRoomMore,
  StContentMainSubStudyRoomNaCa,
  StContentMainSubStudyRoomName,
  StContentMainSubStudyRoomTM,
  StContentMainSubStudyRoomTitle,
  Stallowbox,
  Stallowicon,
} from '../../styles/mypage/Roompagination.styles';

function RoomPagination({ token }) {
  const navigate = useNavigate();

  const [isJoinModalsOpen, setIsJoinModalsOpen] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [page, setPage] = useState(1);

  const roomInfo = useRoomData(page);

  const currentPageData = roomInfo?.data?.currentPageData || [];

  const currentRoom = currentPageData[currentRoomIndex];

  const nextpageHandler = () => {
    if (currentRoomIndex < currentPageData.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1);
    } else {
      if (currentRoomIndex + 1 === currentPageData.length) {
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
        setCurrentRoomIndex(currentPageData.length - 1);
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
      <StContentMainSubStudyLayout>
        <StContentMainSubStudyRoomTM>
          <StContentMainSubStudyRoomTitle>
            모집 중인 스터디
          </StContentMainSubStudyRoomTitle>
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
                {currentRoom.category &&
                  currentRoom.category
                    .split(',')
                    .map((tag) => `#${tag}`)
                    .join(' ')}
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
          <Stallowicon src={leftallow} alt="leftallow" onClick={prevpageHandler} />
          <Stallowicon src={rightallow} alt="rightallow" onClick={nextpageHandler} />
        </Stallowbox>
      </StContentMainSubStudyLayout>
    </StContentMainSubStudyRoom>
  );
}

export default RoomPagination;
