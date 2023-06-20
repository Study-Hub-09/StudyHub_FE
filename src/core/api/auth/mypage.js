import { instance } from '../axios/instance';

const getMypage = async () => {
  const response = await instance.get(`/api/members/mypage`);
  return response.data;
};

export { getMypage };
