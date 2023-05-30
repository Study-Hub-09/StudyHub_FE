import React, { useState } from 'react';
import { styled } from 'styled-components';
import Subtract from '../asset/Subtract.svg';
import Vector from '../asset/Vector.svg';
import check from '../asset/check.svg';
import noncheck from '../asset/noncheck.svg';
import allow from '../asset/Polygon 3.svg';
import leftallow from '../asset/leftallow.svg';
import rightallow from '../asset/rightallow.svg';
import Modal from '../components/Modal';
import { useQuery } from 'react-query';
import { getRoom } from '../api/api';
import Joinmodal from '../components/Joinmodal';

function Main() {
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const { isLoading, isError, data } = useQuery('rooms', getRoom);

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  // console.log(data);

  const checkBoxHandler = () => {
    setChecked(!checked);
  };

  const modalToggleHandler = () => {
    setModalOpen(true);
  };

  const joinmodalToggleHandler = (sessionId) => {
    setJoinModalOpen(true);
    setSelectedRoomId(sessionId);
  };
  return (
    <>
      <div>
        {isModalOpen && (
          <Modal
            onClose={() => {
              setModalOpen(false);
            }}
          />
        )}
        {joinModalOpen && (
          <Joinmodal
            sessionId={selectedRoomId}
            onClose={() => {
              setJoinModalOpen(false);
            }}
          />
        )}
      </div>
      <Stcontainer>
        <StContents>
          <StTopline>
            <StTitlebox>
              <StTitle>공개 스터디</StTitle>
              <Stsubtitle>자유롭게 공개된 스터디에 참여해보세요!</Stsubtitle>
            </StTitlebox>
            <StSearchbox>
              <StSearchicon src={Subtract} alt="" />
              <StSearchinput type="text" placeholder="스터디방 이름 검색" />
              <StButton onClick={modalToggleHandler}>스터디 만들기</StButton>
            </StSearchbox>
          </StTopline>
          <Stfilterbox>
            {checked ? (
              <Stcheckboximg onClick={checkBoxHandler} src={check} alt="" />
            ) : (
              <Stcheckboximg onClick={checkBoxHandler} src={noncheck} alt="" />
            )}
            <div>입장 가능한 방만 보기</div>
            <div>
              분야 필터 <img src={allow} alt="" />
            </div>
          </Stfilterbox>
          <StroomArea>
            {data.data.map((item) => {
              return (
                <Stroombox
                  key={item.sessionId}
                  onClick={() => {
                    joinmodalToggleHandler(item.sessionId);
                  }}
                >
                  <Stroomboxlayout>
                    <Stthumbnail></Stthumbnail>
                    <Stroomtext>
                      <Stroomtitle>{item.roomName}</Stroomtitle>
                      <Stroomsubtitle>{item.roomContent}</Stroomsubtitle>
                    </Stroomtext>
                    <div>
                      <Stroomcount>
                        <span>1 / 9</span>
                        <img src={Vector} alt="" />
                      </Stroomcount>
                    </div>
                  </Stroomboxlayout>
                </Stroombox>
              );
            })}
          </StroomArea>
        </StContents>
        <Stallowbox>
          <img src={leftallow} alt="" />
          <img src={rightallow} alt="" />
        </Stallowbox>
      </Stcontainer>
    </>
  );
}

export default Main;

const Stcontainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StTopline = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StContents = styled.div`
  width: 1018px;
  height: 642px;
`;

const StTitlebox = styled.div`
  width: 301px;
  height: 75.39px;
  gap: 9.39px;
  display: flex;
  flex-direction: column;
`;

const StTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const Stsubtitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #84848484;
`;

const StSearchbox = styled.div`
  gap: 24px;
  display: flex;
  height: 44px;
  align-items: center;
`;

const StSearchinput = styled.input`
  position: relative;
  width: 229px;
  height: 36px;
  background-color: #e8e8e8;
  border-radius: 12px;
  padding-left: 43px;
  font-size: 15px;
`;

const StSearchicon = styled.img`
  position: absolute;
  transform: translateX(14px);
  z-index: 1;
`;

const StButton = styled.button`
  width: 141px;
  height: 44px;
  padding: 12px 27px;
  gap: 10px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  color: #00573f;
  border: 1px solid #bfbfbf;
  &:hover {
    border: none;
    color: #ffffff;
    background-color: #00573f;
  }
`;

const Stroombox = styled.div`
  width: 485px;
  height: 125px;
  border: 1px solid #bfbfbfbf;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  cursor: pointer;
`;

const Stfilterbox = styled.div`
  display: flex;
  justify-content: end;
  gap: 21px;
  margin-top: 90px;
  margin-bottom: 10px;
`;

const StroomArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 15px 40px;
`;

const Stthumbnail = styled.div`
  width: 82px;
  height: 82px;
  background-color: #e8e8e8;
`;

const Stroomboxlayout = styled.div`
  width: 437px;
  height: 98px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Stroomtext = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  transform: translate3d(-70px, -15px, 0px);
`;

const Stroomtitle = styled.div`
  font-weight: 700;
  font-size: 15px;
`;

const Stroomsubtitle = styled.div`
  font-weight: 500;
  font-size: 15px;
`;

const Stroomcount = styled.div`
  color: #90b54c;
  font-size: 15px;
  font-weight: 500;
  transform: translate3d(0px, 40px, 0px);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Stcheckboximg = styled.img`
  transform: translateX(14px);
  cursor: pointer;
`;

const Stallowbox = styled.div`
  width: 1018px;
  display: flex;
  justify-content: end;
  gap: 21px;
`;
