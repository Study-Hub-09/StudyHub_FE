import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import cancel from '../asset/cancel.svg';
import usericon from '../asset/Vector.svg';
import studyhub from '../asset/studyhub.svg';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { joinRoom } from '../api/api';
import { getCookie } from '../Cookies/Cookies';
import { createSession, exitRoom } from '../core/api/openvidu/openvidu';
import lockimg from '../asset/lock.svg';
import { disconnectClient } from '../core/sockJs/sockJs';
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
} from '../styles/mainpage/Joinmodal.styles';
import Swal from 'sweetalert2';

function Joinmodal({ onClose, roomData }) {
  const outside = useRef();
  const navigate = useNavigate();
  const token = getCookie('AccessToken');
  const [roomPassword, setRoomPassword] = useState('');

  const studyTime = 0;
  const sessionId = roomData.sessionId;

  const joinbuttonHandler = async (event) => {
    event.preventDefault();
    const memberData = {
      roomPassword,
    };

    if (token) {
      if (roomPassword !== roomData.roomPassword) {
        Swal.fire({
          icon: 'error',
          iconColor: '#00573f',
          width: 400,
          text: '비밀번호를 확인해 주세요',
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
      } else {
        createSession(roomData.sessionId, memberData)
          .then((response) => {
            if (response.status === 200) {
              navigate(`/rooms/${roomData.sessionId}/detail`, { state: { roomData } });
            }
          })
          .catch((error) => {
            const {
              response: { status: statusCode, data: errorMessage },
            } = error;
            if (statusCode === 400 && errorMessage === '이미 입장한 멤버입니다.') {
              exitRoom(studyTime, sessionId).then((response) => {
                sessionId.disconnect(); // 세션 종료
                disconnectClient(); // 채팅 종료
              });
            }
            // console.log('joinModalError>>>> ', error);
          });
      }
    } else {
      Swal.fire({
        icon: 'info',
        iconColor: '#00573f',
        width: 400,
        text: '로그인이 필요한 서비스입니다',
        confirmButtonColor: '#00573f',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/members/login');
        }
      });
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
          <Stjoinbuttonlayout as="form" onSubmit={joinbuttonHandler}>
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
            <Stjoinbutton type="submit">입장하기</Stjoinbutton>
          </Stjoinbuttonlayout>
        </StLayout>
      </Stmodalbox>
    </Stcontainer>
  );
}

export default Joinmodal;
