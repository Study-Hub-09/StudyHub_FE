import axios from 'axios';
// import { Cookies } from 'react-cookie';
import { getCookie } from '../Cookies/Cookies';
import { instance } from '../core/api/axios/instance';

const getToken = getCookie('AccessToken');
const getToken2 = getCookie('RefreshToken');

// 게시글 조회
const getRoom = async (page) => {
  try {
    const response = await instance.get(`/api/main?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 게시글 생성
const addRoom = async (newRoom) => {
  try {
    const response = await instance.post(`/api/rooms/create`, newRoom, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('인증에 성공했습니다:', response.data);
    return response.data;
  } catch (error) {
    alert(JSON.stringify(error.response.data));
    console.log(getToken, getToken2);
    console.error('인증에 실패했습니다:', error.response.data);
  }
};

// 게시글 상세조회
const getRoomDetail = async (sessionId) => {
  const token = getToken;
  const token2 = getToken2;

  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/rooms/${sessionId}`,
    {
      headers: {
        ACCESS_KEY: `Bearer ${token}`,
        REFRESH_KEY: `Bearer ${token2}`,
      },
    }
  );
  return response.data;
};

// 스터디룸 입장
const joinRoom = async (sessionId, memberData) => {
  try {
    const response = await instance.post(`/api/rooms/${sessionId}/enter`, memberData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 카테고리,검색 조회
const getSearchRoom = async (url) => {
  try {
    const response = await instance.get(`${url}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { getRoom, addRoom, getRoomDetail, joinRoom, getSearchRoom };
