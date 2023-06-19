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
import Swal from 'sweetalert2';

function KakaoRedirectPage() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    if (accessToken) {
      Swal.fire({
        icon: 'info',
        iconColor: '#00573f',
        text: '이미 로그인된 유저입니다',
        width: 400,
        confirmButtonColor: '#00573f',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/main');
        }
      });
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
            Swal.fire({
              icon: 'success',
              iconColor: '#00573f',
              text: responseMessage,
              width: 400,
              confirmButtonColor: '#00573f',
              confirmButtonText: '확인',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/');
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
          const statusCode = error.response?.status;
          if (statusCode === 401) {
            Swal.fire({
              icon: 'error',
              iconColor: '#00573f',
              text: '로그인 실패',
              width: 400,
              confirmButtonColor: '#00573f',
              confirmButtonText: '확인',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/members/login');
              }
            });
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
