import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie } from '../Cookies/Cookies';
import axios from 'axios';

function KakaoRedirectPage() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    if (accessToken) {
      alert('이미 로그인된 유저입니다');
      navigate('/main');
    } else {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/members/kakao/callback?code=${code}`
        )
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

  return <div>KakaoRedirectPage</div>;
}

export default KakaoRedirectPage;
