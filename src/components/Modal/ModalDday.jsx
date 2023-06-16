import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import cancel from '../../asset/cancel.svg';
import DdayList from '../Dday/DdayList';

function ModalDday({ onClose, onDdayListChange }) {
  const outside = useRef();
  const [ddayList, setDdayList] = useState([]);

  const handleDdayListChange = (list) => {
    setDdayList(list);
    onDdayListChange(list);
  };

  return (
    <StDdayContainer
      ref={outside}
      onClick={(event) => {
        if (event.target === outside.current) onClose(false);
      }}
    >
      <StDdayModalBox>
        <StDdayModalH>
          <StDdayHeader>D-Day 설정</StDdayHeader>
          <StDdayCancelimg
            src={cancel}
            alt=""
            width={13.41}
            onClick={() => {
              onClose(false);
            }}
          />
        </StDdayModalH>
        {/* <StDdayModalB>
          <StDdayTitledayCon>
            <StDdayTitleday>
              <StDdayday>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="목표날짜"
                />
              </StDdayday>
            </StDdayTitleday>
            <StDdayCon>
              <StDday></StDday>
            </StDdayCon>
          </StDdayTitledayCon>
          <StButton onClick={calculateDday}>등록</StButton>
          <StDday>Dday: {dday}</StDday>
        </StDdayModalB> */}
        <DdayList onDdayListChange={handleDdayListChange} />
      </StDdayModalBox>
    </StDdayContainer>
  );
}

export default ModalDday;

const StDdayContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;
const StDdayModalBox = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 532px;
  height: 497px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
  gap: 10px;
`;
const StDdayModalH = styled.div`
  height: 50px;
  width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StDdayHeader = styled.div`
  width: 100px;
  height: 21px;
  font-style: normal;
  font-weight: 700;
  font-size: 17.426px;
  line-height: 21px;
  color: #000000;
`;
const StDdayCancelimg = styled.img`
  cursor: pointer;
`;
const StDdayModalB = styled.form`
  height: 300px;
  width: 450px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;
const StDdayTitledayCon = styled.div`
  display: flex;
  align-items: center;
`;
const StDdayTitleday = styled.div`
  display: flex;
  flex-direction: column;
`;
const StDdayTitle = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 60px;
  background: #ffffff;
`;
const StDdayday = styled.div`
  width: 87px;
  height: 60px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #afafaf;
`;
const StDdayCon = styled.div`
  display: flex;
`;
const StDday = styled.div`
  width: 49px;
  height: 20.62px;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #505050;
`;
const Input = styled.input`
  height: 52px;
  width: 200px;
  border: 1px solid #b0b0b0;
  border-radius: 10px;
  padding: 0 10px;

  &::placeholder {
    color: #b0b0b0;
  }

  &:focus {
    transition: 0.5s;
    border: 1.5px solid black;
  }
`;
const StButton = styled.button`
  height: 48px;
  border-radius: 9px;
  border: 1px solid #222222;
  cursor: pointer;
  width: 50%;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 50px;
`;
const StDdayList = styled.div`
  display: flex;
`;
const StDdayItem = styled.div`
  display: flex;
`;
