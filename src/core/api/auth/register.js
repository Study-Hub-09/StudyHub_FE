import { instance } from '../axios/instance';

const register = async (member) => {
  const response = await instance.post('/api/members/register', member);
  return response;
};

const validateEmail = async ({ email }) => {
  const params = new URLSearchParams();
  params.append('email', email);
  const response = await instance.post(`/api/members/register/email-confirm?${params}`);
  return response;
};

const validateNickname = async ({ nickname }) => {
  const response = await instance.get(`/api/members/check-nickname/${nickname}`);
  return response;
};

export { register, validateEmail, validateNickname };
