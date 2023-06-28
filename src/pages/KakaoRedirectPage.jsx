import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Cookies/Cookies';
import { kakaoLogin } from '../core/api/auth/login';
import Loading from '../components/Loading/Loading';
import { Alert } from '@mui/material';

function KakaoRedirectPage() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    if (accessToken) {
      Alert('info', '이미 로그인된 유저입니다.', () => navigate('/main'));
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
            Alert('success', responseMessage, () => navigate('/main'));
          }
        })
        .catch((error) => {
          console.log(error);
          const statusCode = error.response?.status;
          if (statusCode === 401) {
            Alert('error', '로그인 실패', () => navigate('/members/login'));
          }
        });
    }
  }, []);

  return <Loading />;
}

export default KakaoRedirectPage;
