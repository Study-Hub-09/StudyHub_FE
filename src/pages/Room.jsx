import React, { useState, useEffect, useRef } from 'react';
import { styled, css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import { Subscriber } from 'openvidu-browser';
import camOn from '../asset/camon.svg';
import camoff from '../asset/camoff.svg';
import chat from '../asset/chat.svg';
import micOn from '../asset/micon.svg';
import micoff from '../asset/micoff.svg';
import setting from '../asset/setting2.svg';
import logout from '../asset/logout.svg';
import view from '../asset/view.svg';
import Vector from '../asset/Vector.svg';
import { getCookie } from '../Cookies/Cookies';
import { connectClient, disconnectClient, sendMessage } from '../core/sockJs/sockJs';
import { createToken, exitRoom } from '../core/api/openvidu/openvidu';
import UserVideoComponent from '../components/UserVideoComponent';
import Timer from '../components/Timer/Timer';
import Chatting from '../components/Chatting/Chatting';
import Typed from 'react-typed';
import {
  StKakaoRedirectBox,
  StKakaoRedirectContainer,
  StKakaoRedirectContent,
  StKakaoRedirectHeader,
} from '../styles/Common.styles';

function Room() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = getCookie('AccessToken');
  const OV = useRef(null);
  const getUserName = localStorage.getItem('member');

  const { roomData } = location.state || {};

  const [state, setState] = useState({
    mySessionId: roomData.sessionId,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });

  const [ischatOpen, setisChatOpen] = useState(false);
  const [chatDatas, setChatDatas] = useState([]);
  const [message, setMessage] = useState('');

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [subscriber, setSubscriber] = useState('');
  const [isLocal, setIsLocal] = useState('');
  const [streamPropertyChanged, setStreamPropertyChanged] = useState(false);

  const [studyTime, setStudyTime] = useState(null || 0);
  const [loadingstate, setLoadingState] = useState(true);
  const { mySessionId, mainStreamManager, publisher, subscribers, session } = state;

  const onChangeMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  const handleSaveTime = (time) => {
    setStudyTime(time);
  };

  const toggleAudioState = () => {
    // if (streamPropertyChanged) {
    //   setAudioEnabled((prevValue) => !prevValue);
    //   publisher.publishAudio(!audioEnabled);
    // } else {
    //   setAudioEnabled((prevValue) => !prevValue);
    //   publisher.publishAudio(!audioEnabled);
    // }
    setAudioEnabled((prevValue) => !prevValue);
    publisher.publishAudio(!audioEnabled);
  };

  const toggleVideoState = () => {
    setVideoEnabled((prevValue) => !prevValue);
    publisher.publishVideo(!videoEnabled);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setState((prevState) => ({ ...prevState, mainStreamManager: stream }));
    }
    return stream;
  };

  window.close = () => {
    leaveSession(studyTime, mySessionId);
  };

  window.onpopstate = () => {
    leaveSession(studyTime, mySessionId);
  };

  window.onbeforeunload = () => {
    leaveSession(studyTime, mySessionId);
  };

  // window.onbeforeunload = () => {
  //   leaveSession(studyTime, state.mySessionId);
  //   navigate('/main');
  // };

  // 세션 입장을 위해 필요한 토큰을 가져오기
  const getToken = async () => {
    try {
      const response = await createToken(mySessionId);
      return response;
    } catch (error) {
      console.error('인터넷 요청이 실패했습니다: getToken');
    }
  };

  // 구독자 삭제 함수
  const deleteSubscriber = (streamManager) => {
    setState((prevState) => {
      const updatedSubscribers = prevState.subscribers.filter(
        (sub) => sub.stream.streamId !== streamManager.stream.streamId
      );
      return { ...prevState, subscribers: updatedSubscribers };
    });
  };

  const joinSession = () => {
    try {
      OV.current = new OpenVidu();
      const session = OV.current.initSession();
      const mySession = session;

      mySession.on('streamCreated', (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setState((prevState) => ({
          ...prevState,
          subscribers: [...prevState.subscribers, subscriber],
        }));
        const isLocal = subscriber.stream.isLocal();

        console.log('Subscriber stream isLocal>>> ', isLocal);
        setIsLocal(isLocal);
      });

      mySession.on('streamDestroyed', (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      mySession.on('exception', (exception) => {
        console.warn(exception);
      });

      mySession.on('streamPropertyChanged', (event) => {
        const {
          stream,
          changedProperty,
          newValue,
          oldValue,
          reason,
          target: { streamManagers },
        } = event;

        const subscriberIndex = streamManagers.findIndex(
          (manager) => manager.stream === stream && manager instanceof Subscriber
        );

        if (subscriberIndex !== -1 && !isLocal) {
          // const subscriber = streamManagers[subscriberIndex];

          if (changedProperty === 'audioActive') {
            setStreamPropertyChanged(
              (prevStreamPropertyChanged) => !prevStreamPropertyChanged
            );
          } else if (changedProperty === 'videoActive') {
            setStreamPropertyChanged(
              (prevStreamPropertyChanged) => !prevStreamPropertyChanged
            );
          }
        }
      });

      setState((prevState) => ({
        ...prevState,
        session: mySession,
      }));

      // 룸 채팅 연결
      connectClient(mySessionId, getChattingData);

      // 룸 세션 연결
      getToken()
        .then((token) => {
          mySession
            .connect(token, { clientData: getUserName })
            .then(async () => {
              const publisher = await OV.current.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: audioEnabled,
                publishVideo: videoEnabled,
                resolution: '1920x1080',
                frameRate: 60,
                insertMode: 'APPEND',
                mirror: true,
              });

              mySession.publish(publisher);

              const devices = await OV.current.getDevices();

              const videoDevices = devices.filter(
                (device) => device.kind === 'videoinput'
              );

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

              setTimeout(() => {
                setLoadingState(false);
              }, 2000);
            })
            .catch((error) => {
              const { message: errorMessage, name: errorName } = error;
              if (errorMessage && errorName) {
                // alert(`${(errorMessage, errorName)}`);
                console.log(`${(errorMessage, errorName)}`);
              }
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 메시지 보내는 함수
  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      return;
    }
    sendMessage({
      sessionId: mySessionId,
      profile: 'profileimg',
      nickname: getUserName,
      message,
    });
    setMessage('');
  };

  // 서버에서 받는 채팅 데이터
  const getChattingData = (data) => {
    const newData = JSON.parse(data.body);

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

  // 룸 세션 나가기 함수
  const leaveSession = async (studyTime, mySessionId) => {
    if (session) {
      try {
        const response = await exitRoom(studyTime, mySessionId);
        const {
          status: statusCode,
          data: { message },
        } = response;
        if (statusCode === 200 && message === '스터디 룸 퇴장 성공') {
          session.unpublish(mainStreamManager);
          session.disconnect(); // 세션 종료
          disconnectClient(); // 채팅 종료
          navigate('/main');
        }
      } catch (error) {
        console.log(error);
      }
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

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        joinSession();
      } else {
        alert('로그인 후 이용 가능한 페이지입니다');
        navigate('/members/login');
      }
    };

    fetchData();
  }, []);

  return loadingstate ? (
    <StKakaoRedirectContainer>
      <StKakaoRedirectBox>
        <StKakaoRedirectHeader>
          <h1>
            <Typed strings={['loading']} typeSpeed={120} backSpeed={150} loop />
          </h1>
        </StKakaoRedirectHeader>
        <StKakaoRedirectContent>
          <p width="506px">Strive for progress, not perfection</p>
          <p width="387px">redirecting to study hub...</p>
        </StKakaoRedirectContent>
      </StKakaoRedirectBox>
    </StKakaoRedirectContainer>
  ) : (
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
          <Stcamarea>
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => {
                  handleMainVideoStream(publisher);
                }}
              >
                <UserVideoComponent
                  streamManager={publisher}
                  audioEnabled={audioEnabled}
                  videoEnabled={videoEnabled}
                  isLocal={isLocal}
                />
              </div>
            ) : null}
            {subscribers.map((sub) => (
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
                  audioEnabled={audioEnabled}
                  videoEnabled={videoEnabled}
                  streamPropertyChanged={streamPropertyChanged}
                  isLocal={isLocal}
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
                onClick={() => leaveSession(studyTime, mySessionId)}
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
  background-color: #1e1e1e;
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
  color: #b6b6b6;
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
