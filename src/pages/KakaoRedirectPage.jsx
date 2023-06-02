import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie } from '../Cookies/Cookies';
import { instance } from '../core/api/axios/instance';
import Typed from 'react-typed';
import {
  StKakaoRedirectBox,
  StKakaoRedirectContainer,
  StKakaoRedirectContent,
  StKakaoRedirectHeader,
} from '../styles/Common.styles';

function KakaoRedirectPage({ width }) {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    if (accessToken) {
      alert('이미 로그인된 유저입니다');
      navigate('/main');
    } else {
      instance
        .get(`/api/members/kakao/callback?code=${code}`)
        .then((response) => {
          console.log(response);
          const statusCode = response.status;
          const accessToken = response.headers.get('access_token').split(' ')[1];
          const refreshToken = response.headers.get('refresh_token').split(' ')[1];
          setCookie('AccessToken', accessToken, { path: '/' });
          setCookie('RefreshToken', refreshToken, { path: '/' });

          if (statusCode === 200) {
            alert('로그인 성공!');
            navigate('/');
          } else {
            alert('로그인 실패!');
            navigate('/members/login');
          }
        })
        .catch((error) => {
          console.log(error);
          const statusCode = error.response?.status;
          if (statusCode === 401) {
            alert('이미 로그인된 유저입니다.');
            navigate('/main');
          } else {
            alert('로그인 실패!');
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
