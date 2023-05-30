import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import cancel from '../asset/cancel.svg';
import Vector from '../asset/Vector.svg';
import { useNavigate } from 'react-router-dom';

function Joinmodal({ onClose }) {
  const outside = useRef();
  const navigate = useNavigate();
  const joinbuttonHandler = () => {
    navigate('/room');
    onClose(false);
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
          <Sttitle>스터디 이름</Sttitle>
          <Stcategory>카테고리</Stcategory>
          <Stcontent>스터디 설명글</Stcontent>
          <Stroomcount>
            <span>1 / 9</span>
            <img src={Vector} alt="" />
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
