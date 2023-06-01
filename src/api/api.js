import axios from 'axios';
// import { Cookies } from 'react-cookie';
import { getCookie } from '../cookie/Cookie';

const getToken = getCookie('token');
const getToken2 = getCookie('token2');

localStorage.setItem(
  'token',
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW9rQGdtYWlsLmNvbSIsImV4cCI6MTY4NTU0ODY4NSwiaWF0IjoxNjg1NTQ1MDg1fQ.Ir4SJU59M6NKZdJWuySw4fiaAlQH5XC5Wb7fYMHqlI4'
);
localStorage.setItem(
  'token2',
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW9rQGdtYWlsLmNvbSIsImV4cCI6MTY4NTU1MzcyNSwiaWF0IjoxNjg1NTQ1MDg1fQ.NVs2t1JAKP-f3hV-Ezm3oQaMm0c1KaWaKbZNiBMrfbk'
);

// 게시글 조회
const getRoom = async (page) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/main?page=${page}`
  );
  return response.data;
};
// 게시글 생성
const addRoom = async (newRoom) => {
  const token = getToken;
  const token2 = getToken2;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/room/create`,
      newRoom,
      {
        headers: {
          ACCESS_KEY: `Bearer ${token}`,
          REFRESH_KEY: `Bearer ${token2}`,
        },
      }
    );

    console.log('인증에 성공했습니다:', response.data);
  } catch (error) {
    alert(JSON.stringify(error.response.data));
    console.log(token);
    console.error('인증에 실패했습니다:', error.response.data);
  }
};

// 게시글 상세조회
const getRoomDetail = async (sessionId) => {
  const token = getToken;
  const token2 = getToken2;
  // const token = localStorage.getItem('token');
  // const token2 = localStorage.getItem('token2');
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/room/${sessionId}`,
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
  // const token = getToken;
  // const token2 = getToken2;
  const token = localStorage.getItem('token');
  const token2 = localStorage.getItem('token2');

  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/room/${sessionId}/enter`,
    memberData,
    {
      headers: {
        ACCESS_KEY: `Bearer ${token}`,
        REFRESH_KEY: `Bearer ${token2}`,
      },
    }
  );
  return response.data;
};

export { getRoom, addRoom, getRoomDetail, joinRoom };
