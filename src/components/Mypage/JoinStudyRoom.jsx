import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ModalPortal from '../Modal/ModalPortal';
import Joinmodal from '../Joinmodal';
import { instance } from '../../core/api/axios/instance';

function JoinStudyRoom({ token }) {
  const [myRooms, setMyRooms] = useState([]);
  const [openModalIndex, setOpenModalIndex] = useState(-1);

  const userInfo = async () => {
    try {
      const response = await instance.get(`/api/members/mypage`);
      // console.log('#######response', response.data.data);

      const { myRooms } = response.data.data;
      setMyRooms(myRooms);
      return response.data.data;
    } catch (error) {
      // console.log('????error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      userInfo();
    }
  }, []);

  const openJoinModal = (index) => {
    setOpenModalIndex(index);
  };

  const closeJoinModal = () => {
    setOpenModalIndex(-1);
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

                  {/* <StContentMainTodoListRoomBtn onClick={() => openJoinModal(index)}>
                    <StContentMainTodoListRoomBtnF>
                      입장하기
                    </StContentMainTodoListRoomBtnF>
                  </StContentMainTodoListRoomBtn> */}
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
  margin: 19px 20px 22px 20px;
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
  /* border: 1px solid #8cacff; */
`;
const StContentMainTodoListRoomNaCa = styled.div`
  display: flex;
  flex-direction: column;
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
