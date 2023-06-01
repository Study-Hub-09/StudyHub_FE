import axios from 'axios';
import { getCookie } from '../../../Cookies/Cookies';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

// HTTP 요청 가로채기
// 요청은 AccessToken과 RefreshToken 담아서
instance.interceptors.request.use(
  // 요청을 보내기 전에 수행할 작업
  (config) => {
    console.log('인터셉터 요청 성공');
    console.log('config===> ', config);
    const accessToken = getCookie('AccessToken');
    const refreshToken = getCookie('RefreshToken');
    console.log('AT==> ', accessToken);
    console.log('RT==> ', refreshToken);

    // 토큰이 존재하는 경우에만 헤더스에 추가
    if (accessToken && refreshToken) {
      config.headers['Access_Token'] = `Bearer ${accessToken}`;
      config.headers['Refresh_Token'] = `Bearer ${refreshToken}`;
    }

    console.log('2.config===> ', config);
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  (error) => {
    console.log('인터셉터 요청 오류');
    console.log(error);
    return Promise.reject(error);
  }
);

// 요청후에 실행될 코드
// instance.interceptors.response.use(
//   // 요청을 보내기 전 수행되는 함수
//   function (config) {
//     console.log('인터셉터 요청 성공');
//     const accessToken = getCookie('AccessToken');
//     // const refreshToken = getCookie('RefreshToken');

//     // 토큰이 존재하는 경우에만 헤더에 추가
//     if (accessToken) {
//       config.headers['Access_token'] = `Bearer ${accessToken}`;
//       // config.headers['Refresh_token'] = `Bearer ${refreshToken}`;
//     }
//     return config;
//   },

//   // 오류 요청을 보내기 전 수행되는 함수
//   function (error) {
//     console.log('인터셉터 요청 오류');
//     return Promise.reject(error);
//   }
// );
