import SockJs from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getCookie } from '../../Cookies/Cookies';

let stompClient = null;
const accessToken = getCookie('AccessToken');
const refreshToken = getCookie('RefreshToken');

const connectClient = (sessionId, getChattingData) => {
  console.log('sessionId shipporrrrrrrr>>>', sessionId);
  const socket = new SockJs(`${process.env.REACT_APP_SERVER_URL}/ws-stomp`);
  stompClient = Stomp.over(() => socket);
  stompClient.connect(
    {
      Authorization: `Bearer ${accessToken}`,
      Refresh_Token: `Bearer ${refreshToken}`,
    },
    (frame) => {
      console.log('frame====> 연결 성공!', frame);
      stompClient.subscribe(`/sub/chat/room/${sessionId}`, getChattingData);
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

export { connectClient, sendMessage };
