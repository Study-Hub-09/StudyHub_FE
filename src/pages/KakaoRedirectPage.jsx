import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Cookies/Cookies';
import { kakaoLogin } from '../core/api/auth/login';
import Swal from 'sweetalert2';
import Loading from '../components/Loading/Loading';

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

  return <Loading />;
}

export default KakaoRedirectPage;
