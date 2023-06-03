import React, { useState, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';
import Joinmodal from './Joinmodal';
import Room from '../pages/Room';
import { useNavigate, useParams } from 'react-router-dom';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

const OpenviduComponent = ({ onClose, roomData }) => {
  const [state, setState] = useState({
    mySessionId: 'SessionA',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });
  const navigate = useNavigate();
  const param = useParams();
  const OV = useRef(null);

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);

    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const handleChangeSessionId = (e) => {
    setState((prevState) => ({ ...prevState, mySessionId: e.target.value }));
  };

  const handleChangeUserName = (e) => {
    setState((prevState) => ({ ...prevState, myUserName: e.target.value }));
  };

  const handleMainVideoStream = (stream) => {
    if (state.mainStreamManager !== stream) {
      setState((prevState) => ({ ...prevState, mainStreamManager: stream }));
    }
  };

  const deleteSubscriber = (streamManager) => {
    let subscribers = state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setState((prevState) => ({ ...prevState, subscribers: subscribers }));
    }
  };

  const joinSession = () => {
    OV.current = new OpenVidu();
    const mySession = OV.current.initSession();

    // navigate(`/room/${roomData.sessionId}/detail`);
    setState((prevState) => ({ ...prevState, session: mySession }));
  };

  useEffect(() => {
    if (state.session) {
      state.session.on('stream', (event) => {
        let subscriber = state.session.subscribe(event.stream, undefined);
        setState((prevState) => ({
          ...prevState,
          subscribers: [...prevState.subscribers, subscriber],
        }));
      });

      state.session.on('streamDestroyed', (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      state.session.on('exception', (exception) => {
        console.warn(exception);
      });

      getToken().then((token) => {
        state.session
          .connect(token, { clientData: state.myUserName })
          .then(async () => {
            let publisher = await OV.current.initPublisherAsync(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: '640x480',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            });

            state.session.publish(publisher);

            const devices = await OV.current.getDevices();
            const videoDevices = devices.filter((device) => device.kind === 'videoinput');
            const currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            const currentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            setState((prevState) => ({
              ...prevState,
              currentVideoDevice: currentVideoDevice,
              mainStreamManager: publisher,
              publisher: publisher,
            }));
          })
          .catch((error) => {
            console.log(
              '세션에 연결하는 중 오류가 발생했습니다:',
              error.code,
              error.message
            );
          });
      });
    }
  }, [state.session, param]);

  const leaveSession = () => {
    const mySession = state.session;

    if (mySession) {
      mySession.disconnect();
    }

    OV.current = null;
    setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  };

  const switchCamera = async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await state.session.unpublish(state.mainStreamManager);

          await state.session.publish(newPublisher);
          setState((prevState) => ({
            ...prevState,
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const { mySessionId, myUserName, mainStreamManager, publisher, subscribers, session } =
    state;

  return (
    <div>
      {session === undefined ? (
        <Joinmodal roomData={roomData} onClose={onClose} joinSession={joinSession} />
      ) : (
        <Room
          roomData={roomData}
          publisher={publisher}
          subscribe={subscribers}
          leaveSession={leaveSession}
          handleMainVideoStream={handleMainVideoStream}
          mainStreamManager={mainStreamManager}
        />
      )}
    </div>
  );

  async function getToken() {
    try {
      const sessionId = await createSession(mySessionId);
      const response = await createToken(sessionId);
      console.log('4' + response);
      return response;
    } catch (error) {
      console.error('인터넷 요청이 실패했습니다: getToken');
    }
  }

  async function createSession(sessionId) {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + 'api/sessions',
        { customSessionId: sessionId },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('2' + sessionId);
      return response.data; // The sessionId
    } catch (error) {
      console.error('인터넷 요청이 실패했습니다: createSession');
    }
  }

  async function createToken(sessionId) {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('3' + sessionId);
      return response.data; // The token
    } catch (error) {
      console.error('인터넷 요청이 실패했습니다: createToken');
    }
  }
};
export default OpenviduComponent;
