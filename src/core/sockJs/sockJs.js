import SockJs from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getCookie } from '../../Cookies/Cookies';

let stompClient = null;

const connectClient = () => {
  const socket = new SockJs(`${process.env.REACT_APP_SERVER_URL}/ws-edit`);
  stompClient = Stomp.over(() => socket);
  stompClient.connect(
    {
      headers: {
        Access_Token: getCookie('AccessToken'),
      },
    },
    function (frame) {
      console.log('frame====> 연결 성공!', frame);
    }
  );
};

export { connectClient };
