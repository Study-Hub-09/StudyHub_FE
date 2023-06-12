import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import camOn from '../asset/camon.svg';
import camoff from '../asset/camoff.svg';
import chat from '../asset/chat.svg';
import micOn from '../asset/micon.svg';
import micoff from '../asset/micoff.svg';
import setting from '../asset/setting2.svg';
import logout from '../asset/logout.svg';
import view from '../asset/view.svg';
import send from '../asset/send.svg';
import cancel from '../asset/cancel.svg';
import logo from '../asset/logo.svg';
import profileimg from '../asset/user.svg';
import Vector from '../asset/Vector.svg';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import UserVideoComponent from '../components/UserVideoComponent';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import Timer from '../components/Timer/Timer';
import { instance } from '../core/api/axios/instance';
import { getCookie } from '../Cookies/Cookies';
import { connectClient, sendMessage } from '../core/sockJs/sockJs';
import { width } from '@mui/system';
import Chatting from '../components/Chatting/Chatting';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://studyhub-openvidu.shop/';

function Room() {
  const [ischatOpen, setisChatOpen] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
  const params = useParams();
  const location = useLocation();
  const token = getCookie('AccessToken');
  const navigate = useNavigate();
  const OV = useRef(null);
  const getUserName = localStorage.getItem('member');

  const { roomData } = location.state;

  const [state, setState] = useState({
    mySessionId: roomData.sessionId,
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const [chatDatas, setChatDatas] = useState([]);
  const [message, setMessage] = useState('');

  const onChangeMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  const [studyTime, setStudyTime] = useState(null);

  const handleSaveTime = (time) => {
    setStudyTime(time || 0);
    console.log('@@@@Savetime', time);
  };

  const toggleAudioState = () => {
    setAudioEnabled((prevValue) => !prevValue);
    publisher.publishAudio(!audioEnabled);
  };

  const toggleVideoState = () => {
    setVideoEnabled((prevValue) => !prevValue);
    publisher.publishVideo(!videoEnabled);
  };

  const handlePopState = async () => {
    console.log('뒤로세션나가기ㅣㅣㅣㅣㅣ', roomData.sessionId);
    await leaveSession(roomData.sessionId);
    // 원래 이벤트 처리를 원하는 경우 뒤로 가기 처리
    // window.history.back();
  };

  const onbeforeunload = () => {
    console.log('beforeunload event triggered');
    console.log('새로세션나가기ㅣㅣㅣㅣㅣ', roomData.sessionId);
    leaveSession(roomData.sessionId);
  };

  useEffect(() => {
    // 페이지를 빠져나갈 때 세션을 떠난다.
    window.addEventListener('beforeunload', onbeforeunload);
    console.log('beforeunload event listener added');

    // 뒤로 가기 이벤트 처리
    // window.addEventListener('popstate', () => handlePopState(roomData.sessionId));
    window.addEventListener('popstate', async () => {
      await handlePopState(roomData.sessionId);
    });
    console.log('popstate event listener added');

    // Cleanup 함수 처리
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
      console.log('beforeunload event listener removed');
      window.removeEventListener('popstate', () => handlePopState(roomData.sessionId));
      console.log('popstate event listener removed');
    };
  }, []);

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
    setState((prevState) => {
      const updatedSubscribers = prevState.subscribers.filter(
        (sub) => sub !== streamManager
      );
      return { ...prevState, subscribers: updatedSubscribers };
    });
  };

  const joinSession = () => {
    OV.current = new OpenVidu();
    const mySession = OV.current.initSession();

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setState((prevState) => ({
        ...prevState,
        subscribers: [...prevState.subscribers, subscriber],
      }));
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    setState((prevState) => ({
      ...prevState,
      session: mySession,
    }));
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    sendMessage({
      sessionId: mySessionId,
      profile: 'profileimg',
      nickname: getUserName,
      message,
    });
    setMessage('');
  };

  const getChattingData = (data) => {
    const newData = JSON.parse(data.body);
    console.log('newDATA>>>> ', newData);

    setChatDatas((prevChatDatas) => {
      const receivedDatas = {
        sessionId: newData.sessionId,
        createdAt: newData.createdAt,
        profile: newData.profile,
        nickname: newData.nickname,
        message: newData.message,
      };
      return [...prevChatDatas, receivedDatas];
    });
  };

  // useEffect(() => {
  //   if (token) {
  //     joinSession();
  //   } else {
  //     navigate('/members/login');
  //   }
  // }, []);

  useEffect(() => {
    if (state.session) {
      (async function connectToken() {
        try {
          const token = await getToken();
          await state.session.connect(token, { clientData: getUserName });
          connectClient(mySessionId, getChattingData);

          const publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: audioEnabled, // true
            publishVideo: videoEnabled, // true
            resolution: '1920x1080',
            frameRate: 60,
            insertMode: 'APPEND',
            mirror: true,
          });
          console.log('publiser=====> ', publisher);

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
        } catch (error) {
          console.log(
            '세션에 연결하는 중 오류가 발생했습니다:',
            error.code,
            error.message
          );
        }
      })();

      return () => {};
    }
  }, [state.session]);

  const leaveSession = async (sessionId) => {
    const mySession = state.session; // init value: undefined

    if (mySession) {
      try {
        // const params = new URLSearchParams();
        // console.log('####params', params);
        // params.append('studytime', Number(11111));
        // const studyTime = handleSaveTime();
        const studytime = studyTime;
        console.log('STUDYTIME ======> ', studytime);

        const response = await instance.delete(`/api/rooms/${sessionId}/out`, {
          params: {
            studytime: studytime,
          },
        });
        navigate(-1);
        await state.session.unpublish(state.mainStreamManager); ////////////////
        console.log('RESPONSE LEAVE SESSION####### ', response);
        return response;
      } catch (error) {
        console.log('leaveSession ERROR ====> ', error);
      }
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

  // 다른화면으로 이동시 leaveSession
  useEffect(() => {
    if (token) {
      joinSession();
    } else {
      navigate('/members/login');
    }

    return () => {
      leaveSession(roomData?.sessionId);
    };
  }, []);

  const { mySessionId, myUserName, mainStreamManager, publisher, subscribers, session } =
    state;

  async function getToken() {
    try {
      const sessionId = await createSession(mySessionId);
      const response = await createToken(mySessionId); // 토큰
      return response;
    } catch (error) {
      console.error('인터넷 요청이 실패했습니다: getToken');
    }
  }

  async function createSession(sessionId) {
    try {
      const response = await instance.post(`api/rooms/${sessionId}/enter`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('인터넷 요청이 실패했습니다: createSession');
    }
  }
  // console.log('###############subscribers', subscribers);
  // console.log('###############publisher', publisher);
  async function createToken(sessionId) {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + 'openvidu/api/sessions/' + sessionId + '/connection',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic T1BFTlZJRFVBUFA6U1RVRFlIVUI',
          },
        }
      );
      return response.data.token; // token
    } catch (error) {
      console.error('인터넷 요청이 실패했습니다: createToken');
    }
  }

  return (
    <Stcontainer>
      <StLayout>
        <StViewArea>
          <Stheader>
            <Timer onSaveTime={handleSaveTime} />
            <Sttitlebox>
              <Sttitle>{roomData?.roomName}</Sttitle>
              <Stroomcount>
                <span>{roomData.userCount} / 9</span>
                <Stusericon src={Vector} alt="" />
              </Stroomcount>
            </Sttitlebox>
          </Stheader>
          <Stcamarea ischatOpen={ischatOpen}>
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => {
                  handleMainVideoStream(publisher);
                }}
              >
                <UserVideoComponent
                  streamManager={publisher}
                  userName={getUserName}
                  audioEnabled={audioEnabled}
                  videoEnabled={videoEnabled}
                />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => {
                  handleMainVideoStream(sub);
                }}
              >
                <span>{sub.id}</span>
                <UserVideoComponent
                  streamManager={sub}
                  userName={getUserName}
                  audioEnabled={audioEnabled}
                  videoEnabled={videoEnabled}
                />
              </div>
            ))}
          </Stcamarea>
          <Stfooter>
            <Stsettingbox>
              {audioEnabled ? (
                <Sticon src={micOn} alt="" onClick={toggleAudioState} />
              ) : (
                <Sticon src={micoff} alt="" onClick={toggleAudioState} />
              )}
              {videoEnabled ? (
                <Sticon src={camOn} alt="" onClick={toggleVideoState} />
              ) : (
                <Sticon src={camoff} alt="" onClick={toggleVideoState} />
              )}
              <Sticon
                src={chat}
                alt=""
                onClick={() => {
                  setisChatOpen(!ischatOpen);
                }}
              />
              <Sticon src={view} alt="" />
              <Sticon src={setting} alt="" />
              <Sticon
                src={logout}
                alt=""
                onClick={() => leaveSession(roomData.sessionId)}
              />
            </Stsettingbox>
          </Stfooter>
        </StViewArea>
        {/* 채팅창 */}
        {ischatOpen ? (
          <Chatting
            message={message}
            chatDatas={chatDatas}
            onChange={(e) => onChangeMessageHandler(e)}
            onSubmit={(e) => sendMessageHandler(e)}
            onClick={() => {
              setisChatOpen(false);
            }}
            getUserName={getUserName}
          />
        ) : (
          ''
        )}
      </StLayout>
    </Stcontainer>
  );
}

export default Room;

const size = {
  xs: (...args) => css`
    @media (max-width: 1366px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: 1367px) and (max-width: 1500px) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: 1501px) {
      ${css(...args)}
    }
  `,
};

const Stcontainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StViewArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  flex: 1;
`;

const Stcamarea = styled.div`
  width: ${({ ischatOpen }) => (ischatOpen ? '80%' : '70%')};
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 기본적으로 3 열로 표시.
  grid-gap: 8px 8px;
  transform: translateY(-20px);
`;

const Stheader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 3rem;
  /* gap: 10px; */
  gap: 1vw;
  width: ${({ ischatOpen }) => (ischatOpen ? '80%' : '70%')};
  /* padding: 0px 40px; */
`;
const Sttimertext = styled.div`
  /* color: #00573f; */
  /* font-size: 52px; */
  font-weight: 700;
  /* gap: 27px; */
  /* display: flex; */
`;

const Sttitlebox = styled.div`
  font-weight: 700;
  /* font-size: 26px; */
  font-size: 1.35vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Sttitle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-left: 4vw;
`;

const Stsettingbox = styled.div`
  /* width: 424px; */
  width: 22vw;
  /* height: 64px; */
  height: 6vh;
  background-color: rgba(66, 66, 66, 0.8);
  /* gap: 40px; */
  gap: 2.1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Stfooter = styled.div`
  display: flex;
  align-items: end;
`;

const Sticon = styled.img`
  width: 1.7vw;
  cursor: pointer;
`;

const Stroomcount = styled.span`
  color: #90b54c;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;
const Stusericon = styled.img`
  width: 1.2vw;
`;
