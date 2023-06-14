import { instance } from '../axios/instance';
import { openviduapi } from '../axios/openviduapi';

// 세션 생성 함수
const createSession = async (sessionId) => {
  try {
    const response = await instance.post(`api/rooms/${sessionId}/enter`);
    return response.data;
  } catch (error) {
    console.error('인터넷 요청이 실패했습니다: enterRoomSession');
  }
};

// 세션 입장을 위해 토큰 생성 함수
const createToken = async (sessionId) => {
  try {
    const response = await openviduapi.post(
      `/openvidu/api/sessions/${sessionId}/connection`,
      {}
    );
    return response.data.token;
  } catch (error) {
    console.error('인터넷 요청이 실패했습니다: createToken');
  }
};

// 룸 퇴장 함수
const exitRoom = async (studyTime, sessionId) => {
  try {
    const response = await instance.delete(`/api/rooms/${sessionId}/out`, {
      params: {
        studytime: studyTime,
      },
    });
    return response;
  } catch (error) {
    console.log('leaveSession ERROR ====> ', error);
  }
};

export { createToken, createSession, exitRoom };
