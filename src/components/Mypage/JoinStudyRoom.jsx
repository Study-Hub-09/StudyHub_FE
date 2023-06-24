import React, { useState } from 'react';
import ModalPortal from '../Modal/ModalPortal';
import Joinmodal from '../Joinmodal';
import { useQuery } from 'react-query';
import { getMypage } from '../../core/api/auth/mypage';
import more from '../../assets/Icons/more.svg';
import { deleteRoom } from '../../api/api';
import Swal from 'sweetalert2';
import {
  StContentMainTodoList,
  StContentMainTodoListRoom,
  StContentMainTodoListRoomCa,
  StContentMainTodoListRoomList,
  StContentMainTodoListRoomNa,
  StContentMainTodoListRoomNaCa,
  StContentMainTodoListTitle,
} from '../../styles/mypage/Joinstudyroom.styles';

function JoinStudyRoom({ token }) {
  const [myRooms, setMyRooms] = useState([]);
  const [openModalIndex, setOpenModalIndex] = useState(-1);

  const { data, isLoading, isError } = useQuery('mypage', () => getMypage(), {
    onSuccess: (response) => {
      console.log(response);
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
      Swal.fire({
        icon: 'question',
        iconColor: '#00573f',
        text: '삭제하시겠습니까?',
        width: 400,
        confirmButtonColor: '#00573f',
        confirmButtonText: '확인',
        cancelButtonColor: '#570000',
        cancelButtonText: '취소',
        showCancelButton: true, // 취소 버튼 표시 설정
      }).then((response) => {
        if (response.isConfirmed) {
          setMyRooms([]);
        }
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
                <StContentMainTodoListRoomList key={item.roomId}>
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

                  <div
                    onClick={() => {
                      deleteRoomHandler(item.sessionId);
                    }}
                  >
                    <img src={more} alt="more button" />
                  </div>
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
