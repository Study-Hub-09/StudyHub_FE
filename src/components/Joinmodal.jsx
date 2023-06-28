import React, { useRef, useState } from 'react';
import cancel from '../asset/cancel.svg';
import usericon from '../asset/Vector.svg';
import studyhub from '../asset/studyhub.svg';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Cookies/Cookies';
import { createSession, exitRoom } from '../core/api/openvidu/openvidu';
import { Alert } from '../CustomAlert/Alert';
import lockimg from '../asset/lock.svg';
import {
  Stcontainer,
  Stmodalbox,
  StLayout,
  Stheadericon,
  Sttitle,
  Stcategory,
  Stcontent,
  Stheaderbox,
  StroomCount,
  Stjoinbuttonlayout,
  Stcancelimg,
  Stjoinbutton,
  StpasswordInput,
  Stroomboxlmage,
} from '../styles/mainpage/Joinmodal.styles';

function Joinmodal({ onClose, roomData }) {
  const outside = useRef();
  const navigate = useNavigate();
  const token = getCookie('AccessToken');
  const [roomPassword, setRoomPassword] = useState('');

  const sessionId = roomData.sessionId;
  const studyTime = 0;

  const joinbuttonHandler = async (event) => {
    event.preventDefault();
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
          if (!roomPassword) Alert('info', '비밀번호를 입력해 주세요');
          else if (roomPassword) {
            Alert('error', errorMessage);
            setRoomPassword('');
          }
        }

        // 이미 참여하는 스터티 룸이 있는데 다른 방에 참여할 경우 오류
        if (statusCode === 409 && errorMessage === '하나의 방에만 입장할 수 있습니다')
          Alert('error', errorMessage);

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
            console.log(error);
          }
        }
      }
    } else {
      Alert('info', '로그인이 필요한 서비스입니다', () => navigate('/members/login'));
    }
    onClose(false);
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
            <Stroomboxlmage
              src={roomData.imageUrl === '대표 이미지 URL' ? studyhub : roomData.imageUrl}
              alt="roomImage unable"
            />
            <Stheadericon>
              <Stcancelimg
                src={cancel}
                alt="cancleImage unable"
                width={13.41}
                onClick={() => {
                  onClose(false);
                }}
              />
              <StroomCount>
                <span>{roomData.userCount} / 9</span>
                <img src={usericon} alt="userImage unable" width={20} />
              </StroomCount>
            </Stheadericon>
          </Stheaderbox>
          <Sttitle>{roomData?.roomName}</Sttitle>
          <Stcategory>{categoryHashtag}</Stcategory>
          <Stcontent>{roomData?.roomContent}</Stcontent>
          <Stjoinbuttonlayout as="form" onSubmit={joinbuttonHandler}>
            {roomData.secret ? (
              <>
                <img src={lockimg} alt="lockImage unable" width={10} height={14} />
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
            <Stjoinbutton type="submit">입장하기</Stjoinbutton>
          </Stjoinbuttonlayout>
        </StLayout>
      </Stmodalbox>
    </Stcontainer>
  );
}

export default Joinmodal;
