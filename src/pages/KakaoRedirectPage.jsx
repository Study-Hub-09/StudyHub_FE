import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Cookies/Cookies';
import { kakaoLogin } from '../core/api/auth/login';
import Typed from 'react-typed';
import {
  StKakaoRedirectBox,
  StKakaoRedirectContainer,
  StKakaoRedirectContent,
  StKakaoRedirectHeader,
} from '../styles/Common.styles';

function KakaoRedirectPage() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    if (accessToken) {
      alert('이미 로그인된 유저입니다');
      navigate('/main');
    } else {
      kakaoLogin(code)
        .then((response) => {
          const {
            status: statusCode,
            data: {
              message: responseMessage,
              data: { nickname },
            },
          } = response;

          if (statusCode === 200 && responseMessage === '카카오 로그인 성공') {
            localStorage.setItem('member', nickname);
            alert(responseMessage);
            navigate('/');
          }
        })
        .catch((error) => {
          console.log(error);
          const statusCode = error.response?.status;
          if (statusCode === 401) {
            alert('로그인 실패');
            navigate('/members/login');
          }
        });
    }
  }, []);

  return (
    <StKakaoRedirectContainer>
      <StKakaoRedirectBox>
        <StKakaoRedirectHeader>
          <h1>
            <Typed strings={['loading']} typeSpeed={120} backSpeed={150} loop />
          </h1>
        </StKakaoRedirectHeader>
        <StKakaoRedirectContent>
          <p width="506px">Strive for progress, not perfection</p>
          <p width="387px">redirecting to study hub...</p>
        </StKakaoRedirectContent>
      </StKakaoRedirectBox>
    </StKakaoRedirectContainer>
  );
}

export default KakaoRedirectPage;
