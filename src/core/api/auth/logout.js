import { instance } from '../axios/instance';

const logout = async () => {
  const response = await instance.post('/api/members/logout');
  return response;
};

export { logout };
