import React, { useState } from 'react';
import ModalPortal from '../Modal/ModalPortal';
import Joinmodal from '../Joinmodal';
import { useQuery } from 'react-query';
import { getMypage } from '../../core/api/mypage/mypage';
import close from '../../assets/Icons/close.svg';
import { deleteRoom } from '../../core/api/crud/api';
import {
  StContentMainTodoList,
  StContentMainTodoListRoom,
  StContentMainTodoListRoomCa,
  StContentMainTodoListRoomD,
  StContentMainTodoListRoomList,
  StContentMainTodoListRoomNa,
  StContentMainTodoListRoomNaCa,
  StContentMainTodoListTitle,
} from '../../styles/mypage/Joinstudyroom.styles';
import { confirmCancelAlert } from '../../CustomAlert/Alert';

function JoinStudyRoom({ token }) {
  const [myRooms, setMyRooms] = useState([]);
  const [openModalIndex, setOpenModalIndex] = useState(-1);

  const { data, isLoading, isError } = useQuery('mypage', () => getMypage(), {
    onSuccess: (response) => {
      // console.log(response);
      setMyRooms(response.data.myRooms);
    },
    onError: (error) => {
      // console.log('error', error.msg);
    },
    enabled: !!token,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  const openJoinModal = (index) => {
    setOpenModalIndex(index);
  };

  const closeJoinModal = () => {
    setOpenModalIndex(-1);
  };

  const deleteRoomHandler = async (sessionId) => {
    try {
      const result = await deleteRoom(sessionId);
      confirmCancelAlert('question', '삭제하시겠습니까?', () => {
        const updatedRooms = myRooms.filter((room) => room.sessionId !== sessionId);
        setMyRooms(updatedRooms);
      });
    } catch (error) {
      // console.log('Error deleting room:', error);
    }
  };

  return (
    <StContentMainTodoList>
      <StContentMainTodoListTitle>내가 만든 스터디</StContentMainTodoListTitle>
      <StContentMainTodoListRoom>
        {myRooms
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .map((item, index) => {
            if (index < 3) {
              return (
                <StContentMainTodoListRoomList key={item.sessionId}>
                  <StContentMainTodoListRoomNaCa onClick={() => openJoinModal(index)}>
                    <StContentMainTodoListRoomNa>
                      {item.roomName}
                    </StContentMainTodoListRoomNa>
                    <StContentMainTodoListRoomCa>
                      {item.category &&
                        item.category
                          .split(',')
                          .map((tag) => `#${tag}`)
                          .join(' ')}
                    </StContentMainTodoListRoomCa>
                  </StContentMainTodoListRoomNaCa>

                  <StContentMainTodoListRoomD
                    onClick={() => {
                      deleteRoomHandler(item.sessionId);
                    }}
                  >
                    <img src={close} alt="close button" />
                  </StContentMainTodoListRoomD>
                  {openModalIndex === index && (
                    <ModalPortal>
                      <Joinmodal roomData={item} onClose={closeJoinModal} />
                    </ModalPortal>
                  )}
                </StContentMainTodoListRoomList>
              );
            }
            return null;
          })}
      </StContentMainTodoListRoom>
    </StContentMainTodoList>
  );
}

export default JoinStudyRoom;
