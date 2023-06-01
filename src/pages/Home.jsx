import React from 'react';
import styled from 'styled-components';
import GroupHome from '../assets/images/GroupHome.svg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <StHomeContainer>
      <StHomeMainContainer>
        <StMain>
          <StMainEx>화상 스터디로 자율적이고 체계적으로</StMainEx>
          <StMainLogoContainer>
            <StMainLogoName>스터브</StMainLogoName>
            <StMainLogoNameBar></StMainLogoNameBar>
          </StMainLogoContainer>
          <StMainLogoNameEx>
            ‘스터브(STURB)’는 ‘study’와 ‘hub’의 합성어로 공부의 중심지, 바퀴축 등의 의미를
            담았다. <br /> 그룹공부를 통해 집중력을 높여보자!
          </StMainLogoNameEx>
          <StMainBtn>
            <StMainBtnName
              onClick={() => {
                navigate('/main');
              }}
            >
              스터디 만들기
            </StMainBtnName>
          </StMainBtn>
        </StMain>

        <StMainFrame>
          <StMainImg src={GroupHome} alt="오류" />
        </StMainFrame>
      </StHomeMainContainer>
    </StHomeContainer>
  );
}

export default Home;

const StHomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  /* border: 1px solid #ff8698; */
`;
const StHomeMainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  /* border: 1px solid #9e86ff; */
`;
const StMain = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #9e86ff; */
`;
const StMainEx = styled.div`
  width: 279px;
  height: 25px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #000000;
`;
const StMainLogoContainer = styled.div`
  margin: 28px 0px 41px 0px;
  display: flex;
  align-items: center;
`;
const StMainLogoName = styled.div`
  width: 337px;
  height: 100px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 90px;
  line-height: 123px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #000000;
  background: linear-gradient(
    270deg,
    rgba(144, 181, 76, 0.5) 12.76%,
    rgba(0, 87, 63, 0) 75.67%
  );
`;
const StMainLogoNameBar = styled.div`
  width: 8px;
  height: 108px;
  background: #00573f;
  border-radius: 16px;
`;
const StMainLogoNameEx = styled.div`
  width: 520px;
  height: 38px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  margin: 0px 0px 35px 0px;
`;
const StMainBtn = styled.button`
  width: 150px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #90b54c;
  border-radius: 12px;
`;
const StMainBtnName = styled.div`
  width: 102px;
  height: 24px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #ffffff;
`;
const StMainFrame = styled.div`
  width: 100%;
  /* height: calc(100vh - 90px); */
  height: 234px;
  /* border: 1px solid #9e86ff; */
  display: flex;
  justify-content: center;
`;
const StMainImg = styled.img`
  width: 1502.58px;
  /* height: 447px; */
`;
