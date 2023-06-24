import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
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
import {
  Stcontainer,
  StLayout,
  StViewArea,
  Stcamarea,
  Stheader,
  Sttitlebox,
  Sttitle,
  Stsettingbox,
  Stfooter,
  Sticon,
  Stroomcount,
  Stusericon,
} from '../styles/Room.styles';

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

  const [studyTime, setStudyTime] = useState(null || 0);
  const [loadingstate, setLoadingState] = useState(true);
  const { mySessionId, mainStreamManager, publisher, subscribers, session } = state;

  const onChangeMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  // 시간 저장 타이머 함수
  const handleSaveTime = (time) => {
    setStudyTime(time);
  };

  // 사용자 Audio Toggle 함수
  const toggleAudioState = () => {
    setAudioEnabled((prevValue) => !prevValue);
    publisher.publishAudio(!audioEnabled);
  };

  // 사용자 Video Toggle 함수
  const toggleVideoState = () => {
    setVideoEnabled((prevValue) => !prevValue);
    publisher.publishVideo(!videoEnabled);
  };

  // 브라우저 창 닫을시 leaveSession 함수 호출
  window.close = () => {
    leaveSession(studyTime, mySessionId);
  };

  // 브라우저 뒤로가기 클릭시 leaveSession 함수 호출
  window.onpopstate = () => {
    leaveSession(studyTime, mySessionId);
  };

  // 브라우저 새로고침시 leaveSession 함수 호출
  window.onbeforeunload = () => {
    leaveSession(studyTime, mySessionId);
  };

  // 세션 입장을 위해 필요한 토큰을 가져오기
  const getToken = async () => {
    try {
      const response = await createToken(mySessionId);
      return response;
    } catch (error) {
      console.error(error);
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

  // 룸 세션 입장 함수
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

  // 신시간으로 받는 채팅 데이터
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
      mainStreamManager: undefined,
      publisher: undefined,
    });
  };

  // 컴포넌트 마운트시 토큰 유무 확인 후 joinSession함수 호출
  useEffect(() => {
    if (token) {
      joinSession();
    } else {
      alert('로그인 후 이용 가능한 페이지입니다');
      navigate('/members/login');
    }
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
                <Stusericon
                  src={Vector}
                  alt="Rounded Green Background With Darkgreen User Icon"
                />
              </Stroomcount>
            </Sttitlebox>
          </Stheader>

          {/* 카메라 스트림 영역 */}
          <Stcamarea>
            {publisher !== undefined ? (
              <div className="stream-container col-md-6 col-xs-6">
                <UserVideoComponent
                  streamManager={publisher}
                  audioEnabled={audioEnabled}
                  videoEnabled={videoEnabled}
                />
              </div>
            ) : null}
            {subscribers.map((sub) => (
              <div key={sub.id} className="stream-container col-md-6 col-xs-6">
                <span>{sub.id}</span>
                <UserVideoComponent
                  streamManager={sub}
                  audioEnabled={audioEnabled}
                  videoEnabled={videoEnabled}
                />
              </div>
            ))}
          </Stcamarea>

          {/* 세팅 툴박스 */}
          <Stfooter>
            <Stsettingbox>
              {audioEnabled ? (
                <Sticon src={micOn} alt="White Mic Icon" onClick={toggleAudioState} />
              ) : (
                <Sticon
                  src={micoff}
                  alt="Red Mic Icon with Slash"
                  onClick={toggleAudioState}
                />
              )}
              {videoEnabled ? (
                <Sticon src={camOn} alt="White Camera Icon" onClick={toggleVideoState} />
              ) : (
                <Sticon
                  src={camoff}
                  alt="Red Camera Icon With Slash"
                  onClick={toggleVideoState}
                />
              )}
              <Sticon
                src={chat}
                alt="White Message Dots Icon"
                onClick={() => {
                  setisChatOpen(!ischatOpen);
                }}
              />
              <Sticon src={view} alt="White Grid Icon" />
              <Sticon src={setting} alt="White Gear Icon" />
              <Sticon
                src={logout}
                alt="Red Arrow Right From Bracket"
                onClick={() => leaveSession(studyTime, mySessionId)}
              />
            </Stsettingbox>
          </Stfooter>
        </StViewArea>

        {/* 채팅창 */}
        {ischatOpen && (
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
        )}
      </StLayout>
    </Stcontainer>
  );
}

export default Room;
