import { instance } from '../axios/instance';

const login = async (member) => {
  const response = await instance.post('/api/members/login', member);
  return response;
};

const kakaoLogin = async (code) => {
  const response = await instance.get(`/api/members/kakao/callback?code=${code}`);
  return response;
};

export { login, kakaoLogin };
