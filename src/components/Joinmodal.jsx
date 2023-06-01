import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import cancel from '../asset/cancel.svg';
import usericon from '../asset/Vector.svg';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { joinRoom } from '../api/api';

function Joinmodal({ onClose, roomData }) {
  const outside = useRef();
  const navigate = useNavigate();

  const joinbuttonHandler = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    const memberData = {
      member: {
        id: 0,
        kakaoId: 0,
        nickname: 'string',
        email: 'string',
        password: 'string',
        totalStudyTime: {
          seconds: 0,
          nano: 0,
          negative: true,
          zero: true,
          units: [
            {
              dateBased: true,
              timeBased: true,
              duration: {
                seconds: 0,
                nano: 0,
                negative: true,
                zero: true,
              },
              durationEstimated: true,
            },
          ],
        },
      },
      enabled: true,
      username: 'string',
      authorities: [
        {
          authority: `Bearer ${token}`,
        },
      ],
      password: 'string',
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
    };

    try {
      await joinRoom(roomData.sessionId, memberData);
      navigate(`/room/${roomData.sessionId}/detail`);
      onClose(false);
    } catch (error) {
      console.error('방 입장 중 오류가 발생했습니다', error);
    }
  };

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
            <Stthumnail />
            <Stcancelimg
              src={cancel}
              alt=""
              onClick={() => {
                onClose(false);
              }}
            />
          </Stheaderbox>
          <Sttitle>{roomData?.roomName}</Sttitle>
          <Stcategory>카테고리</Stcategory>
          <Stcontent>{roomData?.roomContent}</Stcontent>
          <Stroomcount>
            <span>1 / 9</span>
            <img src={usericon} alt="" />
            <Stjoinbutton onClick={joinbuttonHandler}>입장하기</Stjoinbutton>
          </Stroomcount>
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

const Stthumnail = styled.div`
  width: 120px;
  height: 120px;
  background-color: #dedede;
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

const Stroomcount = styled.div`
  color: #90b54c;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  display: flex;
  justify-content: end;
`;

const Stcancelimg = styled.img`
  cursor: pointer;
`;

const Stjoinbutton = styled.button`
  width: 104px;
  height: 40px;
  border-radius: 30px;
  background-color: #fefefe;
  color: #00574f;
  border: 1px solid #bfbfbf;
  &:hover {
    background-color: #00574f;
    color: #fefefe;
  }
`;
