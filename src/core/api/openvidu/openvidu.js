import { instance } from '../axios/instance';
import { openviduapi } from '../axios/instance';

// 세션 생성 함수
const createSession = async (sessionId, memberData) => {
  const response = await instance.post(`api/rooms/${sessionId}/enter`, memberData);
  return response;
};

// 세션 입장을 위해 토큰 생성 함수
const createToken = async (sessionId) => {
  const response = await openviduapi.post(
    `/openvidu/api/sessions/${sessionId}/connection`,
    {}
  );
  return response.data.token;
};

// 룸 퇴장 함수
const exitRoom = async (studyTime, sessionId) => {
  const response = await instance.delete(`/api/rooms/${sessionId}/out`, {
    params: {
      studytime: studyTime,
    },
  });
  return response;
};

export { createToken, createSession, exitRoom };
