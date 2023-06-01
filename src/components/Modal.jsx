import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { styled, keyframes, css } from 'styled-components';
import { addRoom } from '../api/api';
import cancel from '../asset/cancel.svg';
import lockimg from '../asset/lock.svg';
import BasicDatePicker from './Datepicker';

const Modal = ({ onClose }) => {
  const [roomName, setRoomName] = useState('');
  const [roomContent, setRoomContent] = useState('');
  const [lock, setLock] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [category, setCategory] = useState(false);

  const outside = useRef();
  const queryClient = useQueryClient();

  const mutation = useMutation(addRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries('rooms');
    },
  });

  const addbuttonHandler = () => {
    const addRoom = {
      content: {
        roomName,
        roomContent,
      },
      image: 'string',
    };
    mutation.mutate(addRoom);
    onClose(false);
  };

  const lockbuttonHandler = () => {
    setAnimate(true);
    setLock(!lock);
  };

  if (!onClose) return null;

  return (
    <Stcontainer
      ref={outside}
      onClick={(event) => {
        if (event.target === outside.current) onClose(false);
      }}
    >
      <Stmodalbox>
        <Sttitle>스터디 만들기</Sttitle>
        <StmadalLayout>
          <StmodalLeft>
            <Stroomnamebox>
              <Stfont>방 이름</Stfont>
              <StinputA
                placeholder="방 이름"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
            </Stroomnamebox>
            <Stcontentbox>
              <Stfont>설명</Stfont>
              <StinputB
                placeholder="방을 설명할 수 있는 문장을 써주세요."
                value={roomContent}
                onChange={(e) => {
                  setRoomContent(e.target.value);
                }}
              />
            </Stcontentbox>
            <Stcatebox>
              <Stfont>카테고리</Stfont>
              <Stcategory>
                <StCircle>어학</StCircle>
                <StCircle>취업</StCircle>
                <StCircle>자격증</StCircle>
                <StCircle>취미</StCircle>
                <StCircle>독서</StCircle>
                <StCircle>공무원</StCircle>
                <StCircle>임용</StCircle>
                <StCircle>기타</StCircle>
              </Stcategory>
            </Stcatebox>
          </StmodalLeft>
          <Stline />
          <StmodalRight>
            <Stlayoutbox>
              <button onClick={onClose}>
                <img src={cancel} alt="" />
              </button>
            </Stlayoutbox>
            <div>
              <Stdatepickerbox>
                <Stfont>만료일</Stfont>
                <BasicDatePicker />
              </Stdatepickerbox>
              <Stthumnailbox>
                <Stfont>대표이미지</Stfont>
                <Stthumbnail />
              </Stthumnailbox>
              <Stlockbox>
                <Stfont>비밀방 설정</Stfont>
                <Stlockboxinner>
                  <Stlockbutton onClick={lockbuttonHandler}>
                    <StlockbuttonBall animate={animate} lock={lock} />
                    <Stlockbuttonbg lock={lock} />
                  </Stlockbutton>
                  {lock ? (
                    <>
                      <Stfontcolor>
                        비밀번호를 아는 사람만 입장할 수 있습니다.
                      </Stfontcolor>
                      <div>
                        <img src={lockimg} alt="" width={10} height={14} />
                        <StpasswordInput type="text" placeholder="1234" />
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </Stlockboxinner>
              </Stlockbox>
            </div>
            <Stlayoutbox>
              <Stcreatebutton
                onClick={() => {
                  addbuttonHandler();
                }}
              >
                만들기
              </Stcreatebutton>
            </Stlayoutbox>
          </StmodalRight>
        </StmadalLayout>
      </Stmodalbox>
    </Stcontainer>
  );
};

export default Modal;

const Stcontainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Stmodalbox = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 987px;
  height: 503px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
  padding: 36px, 56px, 60px;
  gap: 10px;
`;

const StmadalLayout = styled.div`
  width: 875px;
  height: 332px;
  display: flex;
  justify-content: space-between;
`;

const StmodalLeft = styled.div`
  width: 417.19px;
  height: 316px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StmodalRight = styled.div`
  width: 417.19px;
  height: 316px;
`;

const Stline = styled.div`
  height: 316px;
  border-left: 1.5px solid #bfbfbf;
`;

const StCircle = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
`;

const Stcategory = styled.div`
  width: 316px;
  height: 152px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 12px 12px;
`;

const StinputA = styled.input`
  background-color: #e8e8e8;
  width: 184px;
  height: 32px;
  border-radius: 12px;
  padding-left: 14px;
  font-size: 15px;
`;

const StinputB = styled.input`
  background-color: #e8e8e8;
  width: 261px;
  height: 57px;
  border-radius: 12px;
  padding-left: 13.81px;
  padding-bottom: 24px;
  font-size: 15px;
`;

const Stroomnamebox = styled.div`
  height: 63px;
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Stcontentbox = styled.div`
  height: 71px;
  display: flex;
  gap: 53px;
`;

const Stcatebox = styled.div`
  height: 166px;
  display: flex;
  gap: 20.19px;
`;

const Stfont = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const Sttitle = styled.div`
  width: 875px;
  font-size: 20px;
  font-weight: 700;
`;

const Stthumbnail = styled.div`
  width: 136px;
  height: 100px;
  background-color: #e8e8e8;
  border-radius: 12px;
`;

const StpasswordInput = styled.input`
  width: 68px;
  height: 32px;
  background-color: #e8e8e8;
  border-radius: 12px;
  padding-left: 10px;
  margin-left: 14px;
`;

const Stcreatebutton = styled.button`
  /* position: absolute; */
  transform: translateY(-50px);
  width: 90px;
  height: 44px;
  border: 1px solid #bfbfbf;
  border-radius: 30px;
  color: #9d9d9d;
  font-size: 15px;
  font-weight: 700;
  &:hover {
    background-color: #00573f;
    color: #ffffff;
  }
`;

const Stlockbutton = styled.button`
  display: flex;
  align-items: center;
  width: 36px;
`;

const Stlockbuttonbg = styled.div`
  position: relative;
  width: 36px;
  height: 18px;
  background-color: ${(props) => (props.lock ? '#00573f' : '#bfbfbf')};
  border-radius: 30px;
`;

const moveForward = keyframes`
  0% {
    transform: translateX(1.53px);
  }
  100% {
    transform: translateX(19.15px);
  }
`;

const moveBackward = keyframes`
  0% {
    transform: translateX(19.15px);
  }
  100% {
    transform: translateX(1.53px);
  }
`;

const StlockbuttonBall = styled.div`
  position: absolute;
  width: 14.5px;
  height: 14.5px;
  border-radius: 30px;
  background-color: #ffffff;
  z-index: 1;
  transform: ${(props) => (props.lock ? 'translateX(19.15px)' : 'translateX(1.53px)')};
  ${(props) =>
    props.animate &&
    css`
      animation: ${props.lock ? moveForward : moveBackward} 0.2s linear;
    `}
`;
const Stdatepickerbox = styled.div`
  display: flex;
  align-items: center;
  gap: 53.19px;
  margin-bottom: 31px;
`;
const Stthumnailbox = styled.div`
  height: 100px;
  display: flex;
  gap: 20.19px;
`;

const Stlockbox = styled.div`
  height: 166px;
  display: flex;
  gap: 20.19px;
  padding-top: 14px;
`;

const Stlockboxinner = styled.div`
  gap: 7px;
  display: flex;
  flex-direction: column;
`;

const Stlayoutbox = styled.div`
  display: flex;
  justify-content: end;
`;

const Stfontcolor = styled.div`
  color: #9d9d9d;
`;
