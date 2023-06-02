import axios from 'axios';
import { getCookie, setCookie } from '../../../Cookies/Cookies';

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
  (response) => {
    console.log('INSTANCE request===> ', response);
    const accessToken = getCookie('AccessToken');
    const refreshToken = getCookie('RefreshToken');

    // 토큰이 존재하는 경우에만 헤더스에 추가
    if (accessToken && refreshToken) {
      response.headers['Access_Token'] = `Bearer ${accessToken}`;
      // response.headers['Refresh_Token'] = `Bearer ${refreshToken}`;
    }
    return response;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  (error) => {
    console.log('인터셉터 요청 오류');
    console.log(error);
    return Promise.reject(error);
  }
);

// 요청후에 실행될 코드
instance.interceptors.response.use(
  // 요청을 보내기 전 수행되는 함수
  (response) => {
    console.log('INSTANCE response======> ', response);
    const accessToken = response.headers.get('access_token').split(' ')[1];
    const refreshToken = response.headers.get('refresh_token').split(' ')[1];
    const nickname = response.data.data;
    setCookie('AccessToken', accessToken, { path: '/' });
    setCookie('RefreshToken', refreshToken, { path: '/' });
    localStorage.setItem('member', nickname);
    return response;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  async (error) => {
    console.log('인터셉터 응답 오류');
    console.log('INSTANCE error=======> ', error);

    const {
      config,
      config: { url, method },
      response: { status, data },
    } = error;

    console.log('response error config: ', config); // error.config
    console.log('response error message: ', data); // Access Token Expired
    console.log('response error status: ', status); // 400
    console.log('response error url: ', url); // 400
    console.log('response error method: ', method); // 400

    // if (status === 400) {
    //   // const originalRequest = config;

    //   try {
    //     const refreshToken = getCookie('RefreshToken');
    //     const originalRequest = await axios({
    //       baseURL: process.env.REACT_APP_SERVER_URL,
    //       method,
    //       url,
    //       headers: {
    //         Refresh_Token: `Bearer ${refreshToken}`,
    //       },
    //     });

    //     // const { Access_Token: newAccessToken, Refresh_Token: newRefreshToken } = headers;
    //     // setCookie('AccessToken', newAccessToken, { path: '/' });
    //     // setCookie('RefreshToken', newRefreshToken, { path: '/' });

    //     // originalRequest.headers['Access_Token'] = `Bearer ${newAccessToken}`;

    //     // console.log('HEADERS====> ', headers);

    //     // console.log('NEWAT===> ', newAccessToken);
    //     // console.log('NEWRT===> ', newRefreshToken);

    //     return await axios(originalRequest);
    //   } catch (error) {
    //     console.log('response error:', error);
    //   }
    // }
    return Promise.reject(error);
  }
);
