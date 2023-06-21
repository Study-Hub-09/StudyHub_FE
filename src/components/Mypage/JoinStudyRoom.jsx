import React, { useState } from 'react';
import { styled } from 'styled-components';
import ModalPortal from '../Modal/ModalPortal';
import Joinmodal from '../Joinmodal';
import { useQuery } from 'react-query';
import { getMypage } from '../../core/api/auth/mypage';
import more from '../../assets/Icons/more.svg';
import { deleteRoom } from '../../api/api';
import Swal from 'sweetalert2';

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
  // console.log(myRooms);

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
          // console.log('Room deleted successfully:', result);
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

const StContentMainTodoList = styled.div`
  box-sizing: border-box;
  width: 40%;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTodoListTitle = styled.div`
  width: 87%;
  height: 10%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.389vw;
  line-height: 1.688rem;
  color: #000000;
  margin: 19px 20px 20px 20px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTodoListRoom = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTodoListRoomList = styled.div`
  width: 87%;
  height: 30%;
  background: rgba(144, 181, 76, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 20px 20px;
  border: 1px solid #8cacff;
`;
const StContentMainTodoListRoomNaCa = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 1px solid #8cacff;
`;
const StContentMainTodoListRoomNa = styled.div`
  width: 100%;
  height: 10%;
  font-style: normal;
  font-weight: 700;
  font-size: 0.938rem;
  line-height: 20px;
  color: #000000;
  display: flex;
  margin: 0px 0px 0px 20px;
  cursor: pointer;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTodoListRoomCa = styled.div`
  width: 100%;
  height: 16px; // 수정필요
  font-style: normal;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 16px;
  color: #90b54c;
  display: flex;
  margin: 0px 0px 0px 20px;
  cursor: pointer;
  /* border: 1px solid #8cacff; */
`;
// const StContentMainTodoListRoomBtn = styled.button`
//   box-sizing: border-box;
//   width: 36%;
//   height: 75%;
//   display: flex;
//   align-items: center;
//   padding: 12px 24px;
//   background: #fefefefe;
//   border: 1px solid #bfbfbfbf;
//   border-radius: 30px;
//   margin: 0px 20px 0px 0px;
//   /* border: 1px solid #8cacff; */
// `;
// const StContentMainTodoListRoomBtnF = styled.div`
//   width: 100%;
//   height: 100%;
//   font-style: normal;
//   font-weight: 700;
//   font-size: 0.938rem;
//   line-height: 20px;
//   display: flex;
//   align-items: center;
//   color: #00573f;
// `;
