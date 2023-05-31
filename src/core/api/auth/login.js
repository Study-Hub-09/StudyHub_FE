import { instance } from '../axios/instance';

const login = async (member) => {
  try {
    const response = await instance.post('/api/members/login', member);
    console.log('Login.js: line6 RESPONSE=====> ', response);
    const accessToken = response.headers.get('access_token').split(' ')[1];
    const refreshToken = response.headers.get('refresh_token').split(' ')[1];
    const statusCode = response.status;
    const responseMessage = response.data.message;
    const nickname = response.data.data;
    return { accessToken, refreshToken, statusCode, responseMessage, nickname };
  } catch (error) {
    console.log('Login.js: line9 ERROR=====> ', error);
    throw error;
  }
};

// const kakaoLogin = async (code) => {
//   try {
//     const response = await instance.get(`/api/members/kakao/callback?code=${code}`);
//     console.log('kakaologin login.js===> ', response);
//     return response;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export { login };
