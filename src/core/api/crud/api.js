import { instance } from '../axios/instance';

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

// 유저 프로필 조회
const getProfile = async () => {
  const response = await instance.get(`/api/members/profile`);
  return response.data;
};

// 유저 프로필 수정
const updateProfile = async (updateProfile) => {
  const response = await instance.patch(`/api/members/profile`, updateProfile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 내 스터디룸 삭제
const deleteRoom = async (sessionId) => {
  try {
    const response = await instance.delete(`/api/rooms/${sessionId}`, sessionId);
    return response.data;
  } catch (error) {
    // 오류 처리
    // console.log('Error deleting room:', error);
  }
};

export {
  getRoom,
  addRoom,
  joinRoom,
  getSearchRoom,
  getProfile,
  updateProfile,
  deleteRoom,
};
