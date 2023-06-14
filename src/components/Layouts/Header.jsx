import React, { useEffect, useState } from 'react';
import LogoB from '../../assets/Images/LogoB.svg';
import Button from '../Buttons/Button';
import {
  StHeaderAuth,
  StHeaderBox,
  StHeaderContainer,
  StHeaderLogo,
  StHeaderRegister,
} from '../../styles/Layout.styles';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../Cookies/Cookies';

function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const tokenHandler = () => {
    if (token) {
      removeCookie('AccessToken', { path: '/' });
      removeCookie('RefreshToken', { path: '/' });
      localStorage.removeItem('member');
      setToken('');
      window.location.reload();
    }
  };

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    setToken(accessToken);
  }, []);

  return (
    <StHeaderContainer>
      <StHeaderBox>
        <StHeaderLogo onClick={() => navigate('/')}>
          <img src={LogoB} alt="StudyHub Plant Logo" />
        </StHeaderLogo>
        <StHeaderAuth>
          <StHeaderRegister>
            <Button
              color="var(--color-black)"
              hover="none"
              onClick={() => navigate('/members/register')}
            >
              회원가입
            </Button>
          </StHeaderRegister>

          <Button
            backgroundcolor="var(--color-black)"
            color="var(--color-white)"
            width="93px"
            height="46px"
            hover="none"
            borderradius="5px"
            onClick={() => {
              token ? tokenHandler() : navigate('/members/login');
            }}
          >
            {token ? '로그아웃' : '로그인'}
          </Button>
        </StHeaderAuth>
      </StHeaderBox>
    </StHeaderContainer>
  );
}

export default Header;
