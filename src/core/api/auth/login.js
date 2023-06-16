import { instance } from '../axios/instance';

const login = async (member) => {
  const response = await instance.post('/api/members/login', member);
  return response;
};

export { login };
