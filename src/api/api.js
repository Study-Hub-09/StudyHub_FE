import { instance } from '../core/api/axios/instance';

// 게시글 조회
const getRoom = async (page) => {
  const response = await instance.get(`/api/main?page=${page}`);
  return response.data;
};
// 게시글 생성
const addRoom = async (newRoom) => {
  const response = await instance.post(`/api/rooms/create`, newRoom, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 게시글 상세조회
// const getRoomDetail = async (sessionId) => {
//   const token = getToken;
//   const token2 = getToken2;

//   const response = await axios.get(
//     `${process.env.REACT_APP_SERVER_URL}/api/rooms/${sessionId}`,
//     {
//       headers: {
//         ACCESS_KEY: `Bearer ${token}`,
//         REFRESH_KEY: `Bearer ${token2}`,
//       },
//     }
//   );
//   return response.data;
// };

// 스터디룸 입장
const joinRoom = async (sessionId, memberData) => {
  const response = await instance.post(`/api/rooms/${sessionId}/enter`, memberData);
  return response.data;
};

// 카테고리,검색 조회
const getSearchRoom = async (page, queryString) => {
  const response = await instance.get(`/api/main?page=${page}&${queryString}`);
  return response.data.data;
};
export { getRoom, addRoom, joinRoom, getSearchRoom };
