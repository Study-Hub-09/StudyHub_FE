import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import cancel from '../asset/cancel.svg';
import usericon from '../asset/Vector.svg';
import studyhub from '../asset/studyhub.svg';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Cookies/Cookies';
import { createSession, exitRoom } from '../core/api/openvidu/openvidu';
import lockimg from '../asset/lock.svg';

function Joinmodal({ onClose, roomData }) {
  const outside = useRef();
  const navigate = useNavigate();
  const token = getCookie('AccessToken');
  const [roomPassword, setRoomPassword] = useState('');

  const sessionId = roomData.sessionId;
  const studyTime = 0;

  const joinbuttonHandler = async () => {
    const memberData = {
      roomPassword,
    };

    if (token) {
      try {
        const response = await createSession(sessionId, memberData);
        const {
          status: statusCode,
          data: { message: responseMessage },
        } = response;
        if (statusCode === 200 && responseMessage === '스터디 룸 입장 성공') {
          navigate(`/rooms/${roomData.sessionId}/detail`, {
            state: { roomData, memberData },
          });
        }
        return response;
      } catch (error) {
        console.log('createSessionError>>> ', error);
        const {
          response: {
            data: { message: errorMessage, statusCode },
          },
        } = error;

        // 룸 비밀번호가 일치하지 않을 때
        if (statusCode === 400 && errorMessage === '비밀번호가 일치하지 않습니다.') {
          if (!roomPassword) alert('비밀번호를 입력해 주세요');
          if (roomPassword) {
            alert(errorMessage);
            setRoomPassword('');
          }
        }

        // 이미 참여하는 스터티 룸이 있는데 다른 방에 참여할 경우 오류
        if (statusCode === 409 && errorMessage === '하나의 방에만 입장할 수 있습니다') {
          alert(errorMessage);
          // navigate('/main');
        }

        // Exception - 나가기 버튼 안 누르고, 새로고침 또는 브라우저 창을 닫아 버리면 퇴장 처리가 되지 않아 임시로 만들어 놓은 에러 핸들링.
        if (statusCode === 409 && errorMessage === '이미 입장한 멤버입니다.') {
          try {
            const response = await exitRoom(studyTime, sessionId);
            const {
              status: statusCode,
              data: { message: responseMessage },
            } = response;
            if (statusCode === 200 && responseMessage === '스터디 룸 퇴장 성공') {
              navigate('/main');
            }
            return response;
          } catch (error) {
            console.log('exitRoom Error>>> ', error);
          }
        }
      }
    } else {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/members/login');
    }
  };
  const categoryHashtag = roomData?.category
    .split(',')
    .map((tag) => `#${tag}`)
    .join(' ');

  return (
    <Stcontainer
      ref={outside}
      onClick={(event) => {
        if (event.target === outside.current) onClose(false);
      }}
    >
      <Stmodalbox>
        <StLayout>
          <Stheaderbox>
            {/* <Stthumnail /> */}
            <img
              src={roomData.imageUrl === '대표 이미지 URL' ? studyhub : roomData.imageUrl}
              alt=""
              width={120}
              height={120}
            />
            <Stheadericon>
              <Stcancelimg
                src={cancel}
                alt=""
                width={13.41}
                onClick={() => {
                  onClose(false);
                }}
              />
              <StroomCount>
                <span>{roomData.userCount} / 9</span>
                <img src={usericon} alt="" width={20} />
              </StroomCount>
            </Stheadericon>
          </Stheaderbox>
          <Sttitle>{roomData?.roomName}</Sttitle>
          <Stcategory>{categoryHashtag}</Stcategory>
          <Stcontent>{roomData?.roomContent}</Stcontent>
          <Stjoinbuttonlayout>
            {roomData.secret ? (
              <>
                <img src={lockimg} alt="" width={10} height={14} />
                <StpasswordInput
                  type="password"
                  placeholder=""
                  maxLength="5"
                  value={roomPassword}
                  onChange={(e) => {
                    setRoomPassword(e.target.value);
                  }}
                />
              </>
            ) : (
              ''
            )}
            <Stjoinbutton onClick={joinbuttonHandler}>입장하기</Stjoinbutton>
          </Stjoinbuttonlayout>
        </StLayout>
      </Stmodalbox>
    </Stcontainer>
  );
}

export default Joinmodal;

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
  width: 532px;
  height: 497px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
  padding: 36px, 56px, 60px;
  gap: 10px;
`;

const StLayout = styled.div`
  width: 420px;
  height: 401px;
`;

const Stheadericon = styled.div`
  width: 100px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

const Sttitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 9.39px;
`;

const Stcategory = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #90b54c;
  margin-bottom: 27px;
`;

const Stcontent = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #848484;
  width: 420px;
  height: 120px;
`;

const Stheaderbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 27px;
`;
const StroomCount = styled.div`
  display: flex;
  gap: 9px;
  color: #90b54c;
  font-weight: 500;
  font-size: 15px;
`;
const Stjoinbuttonlayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Stcancelimg = styled.img`
  cursor: pointer;
`;

const Stjoinbutton = styled.button`
  width: 104px;
  height: 40px;
  border-radius: 30px;
  font-weight: 700;
  line-height: 20px;
  background-color: #fefefe;
  color: #00574f;
  border: 1px solid #bfbfbf;
  margin-left: 17px;
  &:hover {
    background-color: #00574f;
    color: #fefefe;
  }
`;

const StpasswordInput = styled.input`
  width: 68px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 7px;
  padding-left: 14px;
  border: 1px solid #9d9d9d;
  margin-left: 14px;
`;
