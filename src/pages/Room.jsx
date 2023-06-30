import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
import Loading from '../components/Loading/Loading';
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
import { Alert } from '../CustomAlert/Alert';

function Room() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: sessionId } = useParams();
  const token = getCookie('AccessToken');
  const OV = useRef(null);
  const getUserName = localStorage.getItem('member');

  const { roomData } = location.state || {};

  const [state, setState] = useState({
    mySessionId: sessionId,
    session: undefined,
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
  const [isChangedProperty, setIsChangedProperty] = useState(false);
  const { mySessionId, publisher, subscribers, session } = state;

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
    navigate('/main');
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

      mySession.on('streamPropertyChanged', (event) => {
        const { newValue, changedProperty } = event;
        if (changedProperty === 'videoActive' || changedProperty === 'audioActive')
          setIsChangedProperty(newValue);
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

              setState((prevState) => ({
                ...prevState,
                publisher: publisher,
              }));

              setTimeout(() => {
                setLoadingState(false);
              }, 2000);
            })
            .catch((error) => {
              const { message: errorMessage, name: errorName } = error;
              if (errorMessage && errorName) {
                if (errorName === 'DEVICE_ACCESS_DENIED') {
                  Alert('info', '카메라 및 마이크를 허용해 주세요.', () => navigate(-1));
                } else if (errorName === 'DEVICE_ALREADY_IN_USE') {
                  Alert(
                    'info',
                    '카메라 및 마이크가 이미 다른 곳에서 사용 중입니다.',
                    () => navigate(-1)
                  );
                } else if (errorName === 'INPUT_VIDEO_DEVICE_NOT_FOUND') {
                  Alert('info', '카메라를 연결해 주세요.', () => navigate(-1));
                }
              } else {
                Alert('info', `${(errorMessage, errorName)}`, () => navigate(-1));
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
        profile: newData.profileImg,
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

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      subscribers: [...prevState.subscribers],
    }));
  }, [isChangedProperty]);

  // 컴포넌트 마운트시 토큰 유무 확인 후 joinSession함수 호출
  useEffect(() => {
    if (token) {
      joinSession();
    } else {
      Alert('info', '로그인이 필요한 서비스입니다', () => navigate('/login'));
    }
  }, []);

  const nondevAlert = () => Alert('info', '개발중입니다.');

  return loadingstate ? (
    <Loading />
  ) : (
    <Stcontainer>
      <StLayout>
        <StViewArea>
          <Stheader>
            <Timer onSaveTime={handleSaveTime} />
            <Sttitlebox>
              <Sttitle>{roomData?.roomName}</Sttitle>
              <Stroomcount>
                <span>{1 + subscribers.length} / 9</span>
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
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub) => (
              <div key={sub.id} className="stream-container col-md-6 col-xs-6">
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
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
                  alt="Red Mic Icon With Slash"
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
              <Sticon src={view} alt="White Grid Icon" onClick={nondevAlert} />
              <Sticon src={setting} alt="White Gear Icon" onClick={nondevAlert} />
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
