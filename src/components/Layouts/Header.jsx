import React, { useEffect, useState } from 'react';
import LogoB from '../../assets/Images/LogoB.svg';
import Button from '../Buttons/Button';
import {
  StHeaderAuth,
  StHomeLayoutBox,
  StHomeLayoutContainer,
  StHeaderLogo,
  StHeaderRegister,
} from '../../styles/Layout.styles';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../Cookies/Cookies';
import { logout } from '../../core/api/auth/logout';

function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const tokenHandler = () => {
    if (token) {
      logout()
        .then((response) => {
          const {
            status: statusCode,
            data: { message: responseMessage },
          } = response;
          if (statusCode === 200 && responseMessage === '로그아웃 성공') {
            removeCookie('AccessToken', { path: '/' });
            removeCookie('RefreshToken', { path: '/' });
            localStorage.removeItem('member');
            setToken('');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return (
    <StHomeLayoutContainer position="sticky" zindex="1" top="0px">
      <StHomeLayoutBox>
        <StHeaderLogo onClick={() => navigate('/')}>
          <img src={LogoB} alt="StudyHub Plant Logo" />
        </StHeaderLogo>
        <StHeaderAuth>
          <StHeaderRegister>
            {token ? (
              ''
            ) : (
              <Button
                color="var(--color-black)"
                hover="none"
                onClick={() => navigate('/members/register')}
              >
                회원가입
              </Button>
            )}
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
      </StHomeLayoutBox>
    </StHomeLayoutContainer>
  );
}

export default Header;
