import axios from 'axios';
import { getCookie, setCookie, removeCookie } from '../../../Cookies/Cookies';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export const openviduapi = axios.create({
  baseURL: process.env.REACT_APP_APPLICATION_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

// 첫번째 인스턴스 요청 가로채기
instance.interceptors.request.use(
  // Access Token과 Refresh Token을 headers에 담아서 요청
  (config) => {
    // console.log('INSTANCE REQUEST SUCCESS===> ', config);
    const accessToken = getCookie('AccessToken');
    const refreshToken = getCookie('RefreshToken');

    // 토큰이 존재하는 경우에만 headers에 추가
    if (accessToken && refreshToken) {
      config.headers['Access_Token'] = `Bearer ${accessToken}`;
    }
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  (error) => {
    // console.log('INSTANCE REQUEST ERROR=======> ', error);
    return Promise.reject(error);
  }
);

// 첫번째 인스턴스 응답 가로채기
instance.interceptors.response.use(
  // Access Token과 Refresh 토큰 처리
  (response) => {
    // console.log('INSTANCE RESPONSE SUCCESS======> ', response);
    const {
      status: statusCode,
      data: { message: responseMessage, data: nickname },
    } = response;
    if (
      (statusCode === 200 && responseMessage === '로그인 성공') ||
      (statusCode === 200 && responseMessage === '카카오 로그인 성공')
    ) {
      const accessToken = response.headers.get('access_token').split(' ')[1];
      const refreshToken = response.headers.get('refresh_token').split(' ')[1];
      setCookie('AccessToken', accessToken, { path: '/' });
      setCookie('RefreshToken', refreshToken, { path: '/' });
    }
    if (statusCode === 200 && responseMessage === '로그인 성공') {
      localStorage.setItem('member', nickname);
    }
    return response;
  },

  // 오류 응답을 보내기 전 수행되는 함수
  async (error) => {
    // console.log('INSTANCE RESPONSE ERROR=======> ', error);

    const {
      config,
      response: { status, data },
    } = error;

    const originalRequest = config;
    const refreshToken = getCookie('RefreshToken');

    if (status === 403 && data === 'Access Token Expired') {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/members/refresh-token`,
          {
            headers: {
              Refresh_Token: `Bearer ${refreshToken}`,
            },
          }
        );
        const newAccessToken = data.data.split(' ')[1];
        setCookie('AccessToken', newAccessToken, { path: '/' });
        originalRequest.headers['Access_Token'] = `Bearer ${newAccessToken}`;
        return await axios(originalRequest);
      } catch (error) {
        // console.log('response error:', error);

        const {
          response: {
            status,
            data: { message },
          },
        } = error;

        if (status === 403 && message === 'Refresh Token Expired') {
          alert('로그인 후 다시 시도해주세요!');
          removeCookie('AccessToken', { path: '/' });
          removeCookie('RefreshToken', { path: '/' });
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

//====================//

// 두번째 인스턴스 요청 가로채기
openviduapi.interceptors.request.use(
  // Access Token과 Openvidu Token headers에 담아서 요청
  (config) => {
    // console.log('OPENVIDU REQUEST SUCCESS===> ', config);
    const accessToken = getCookie('AccessToken');
    const refreshToken = getCookie('RefreshToken');

    // 토큰이 존재하는 경우에만 헤더스에 추가
    if (accessToken && refreshToken) {
      config.headers['Access_Token'] = `Bearer ${accessToken}`;
      config.headers['Authorization'] = 'Basic T1BFTlZJRFVBUFA6U1RVRFlIVUI';
    }
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  (error) => {
    // console.log('OPENVIDU REQUEST ERROR=======> ', error);
    return Promise.reject(error);
  }
);

// 두번째 인스턴스 응답 가로채기
openviduapi.interceptors.response.use(
  // 응답을 보내기 전 수행되는 함수
  (response) => {
    // console.log('OPENVIDU RESPONSE SUCCESS======> ', response);
    return response;
  },

  // 오류 응답을 보내기 전 수행되는 함수
  async (error) => {
    // console.log('OPENVIDU RESPONSE ERROR=======> ', error);

    const {
      config,
      response: { status, data },
    } = error;

    const originalRequest = config;
    const refreshToken = getCookie('RefreshToken');

    if (status === 403 && data === 'Access Token Expired') {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/members/refresh-token`,
          {
            headers: {
              Refresh_Token: `Bearer ${refreshToken}`,
            },
          }
        );
        const newAccessToken = data.data.split(' ')[1];
        setCookie('AccessToken', newAccessToken, { path: '/' });
        originalRequest.headers['Access_Token'] = `Bearer ${newAccessToken}`;
        return await axios(originalRequest);
      } catch (error) {
        const {
          response: {
            status,
            data: { message },
          },
        } = error;

        if (status === 403 && message === 'Refresh Token Expired') {
          alert('로그인 후 다시 시도해주세요!');
          removeCookie('AccessToken', { path: '/' });
          removeCookie('RefreshToken', { path: '/' });
          window.location.href = '/members/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
