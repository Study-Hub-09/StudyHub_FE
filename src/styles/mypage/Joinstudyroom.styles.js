import { styled } from 'styled-components';

export const StContentMainTodoList = styled.div`
  box-sizing: border-box;
  width: 40%;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTodoListTitle = styled.div`
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

export const StContentMainTodoListRoom = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTodoListRoomList = styled.div`
  width: 87%;
  height: 30%;
  background: rgba(144, 181, 76, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 20px 20px;
`;

export const StContentMainTodoListRoomNaCa = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const StContentMainTodoListRoomNa = styled.div`
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

export const StContentMainTodoListRoomCa = styled.div`
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

export const StContentMainTodoListRoomD = styled.div`
  padding-right: 10px;
  cursor: pointer;
  /* border: 1px solid #8cacff; */
`;
