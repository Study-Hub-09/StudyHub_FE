import axios from 'axios';
import { getCookie } from '../../../Cookies/Cookies';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

// 요청은 AccessToken만 담겨서
instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    console.log('인터셉터 요청 성공');
    const accessToken = getCookie('AccessToken');
    // const refreshToken = getCookie('RefreshToken');

    // 토큰이 존재하는 경우에만 헤더에 추가
    if (accessToken) {
      config.headers['Access_token'] = `Bearer ${accessToken}`;
      // config.headers['Refresh_token'] = `Bearer ${refreshToken}`;
    }
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log('인터셉터 요청 오류');
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
