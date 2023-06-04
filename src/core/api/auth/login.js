import { instance } from '../axios/instance';

const login = async (member) => {
  try {
    const response = await instance.post('/api/members/login', member);
    console.log('Login.js: line6 RESPONSE=====> ', response);
    return response;
  } catch (error) {
    console.log('Login.js: line9 ERROR=====> ', error);
    throw error;
  }
};

export { login };
