import SockJs from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getCookie } from '../../Cookies/Cookies';

let stompClient = null;

const connectClient = (sessionId, getChattingData) => {
  const accessToken = getCookie('AccessToken');
  const refreshToken = getCookie('RefreshToken');
  const socket = new SockJs(`${process.env.REACT_APP_SERVER_URL}/ws-stomp`);
  stompClient = Stomp.over(() => socket);
  stompClient.connect(
    {
      Access_Token: `Bearer ${accessToken}`,
      Refresh_Token: `Bearer ${refreshToken}`,
    },
    (frame) => {
      console.log('frame====> 연결 성공!', frame);
      stompClient.subscribe(`/sub/chat/room/${sessionId}`, getChattingData);
    },
    (error) => {
      console.log('frame error===> 연결 오류 ', error);
    }
  );
};

const sendMessage = async (payload) => {
  const message = {
    sessionId: payload.sessionId,
    profile: payload.profile,
    nickname: payload.nickname,
    message: payload.message,
  };
  await stompClient.send(`/pub/chat/message`, {}, JSON.stringify(message));
};

const disconnectClient = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
    console.log('frame====> 연결 해제 완료');
  }
};

export { connectClient, sendMessage, disconnectClient };
