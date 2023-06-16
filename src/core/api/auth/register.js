import { instance } from '../axios/instance';

const register = async (member) => {
  const response = await instance.post('/api/members/register', member);
  return response;
};

const validateEmail = async ({ email }) => {
  const params = new URLSearchParams();
  params.append('email', email);
  const response = await instance.post(`/api/members/register/emailConfirm?${params}`);
  return response;
};

const validateNickname = async ({ nickname }) => {
  const response = await instance.get(`/api/members/checkNickname/${nickname}`);
  return response;
};

export { register, validateEmail, validateNickname };
