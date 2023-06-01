import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SymbolG from '../../assets/Images/SymbolG.svg';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../Cookies/Cookies';

function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    setToken(accessToken);
  }, []);

  const tokenHandler = () => {
    if (token) {
      removeCookie('AccessToken', { path: '/' });
      removeCookie('RefreshToken', { path: '/' });
      setToken('');
      window.location.reload();
    }
  };
  console.log(token);
  return (
    <StHeaderContainer>
      <StLogoNameContainer>
        <StLogo src={SymbolG} alt="오류" />
        <StLogoName>스터브</StLogoName>
      </StLogoNameContainer>

      <StMenuContainer>
        <StMenu
          onClick={() => {
            navigate('/main');
          }}
        >
          진행중인 스터디
        </StMenu>
        <StMenu2
          onClick={() => {
            navigate('/main');
          }}
        >
          내 공부 현황
        </StMenu2>
        <StMenu3
          onClick={() => {
            navigate('/main');
          }}
        >
          검색
        </StMenu3>
        <StLoginBtn
          onClick={() => {
            token ? tokenHandler() : navigate('/members/login');
          }}
        >
          <StLoginBtnText>{token ? '로그아웃' : '로그인'}</StLoginBtnText>
        </StLoginBtn>
      </StMenuContainer>
    </StHeaderContainer>
  );
}

export default Header;

const StHeaderContainer = styled.div`
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* border: 1px solid #ff8e95; */
`;
const StLogoNameContainer = styled.div`
  width: 98px;
  height: 40px;
  /* border: 1px solid #ff8e95; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StLogo = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;
const StLogoName = styled.div`
  width: 50px;
  height: 25px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #00573f;
`;
const StMenuContainer = styled.div`
  width: 385px;
  height: 48px;
  /* border: 1px solid #ff8e95; */
  display: flex;
  align-items: center;
`;
const StMenu = styled.div`
  width: 125px;
  height: 22px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #000000;
  cursor: pointer;
`;
const StMenu2 = styled.div`
  width: 90px;
  height: 22px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #000000;
  margin: 0px 0px 0px 20px;
  cursor: pointer;
`;
const StMenu3 = styled.div`
  width: 30px;
  height: 22px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #000000;
  margin: 0px 20px 0px 20px;
  cursor: pointer;
`;
const StLoginBtn = styled.button`
  width: 100px;
  height: 40px;
  background: #000000;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StLoginBtnText = styled.div`
  width: 60px;
  height: 16px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #ffffff;
`;
