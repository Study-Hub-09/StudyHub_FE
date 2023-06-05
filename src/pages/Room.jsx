import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import play from '../asset/play.svg';
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
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
function Room() {
  const [micon, setMicOn] = useState(false);
  const [camon, setCamOn] = useState(false);
  const [ischatOpen, setisChatOpen] = useState(false);
  const params = useParams();
  const location = useLocation();

  const { roomData } = location.state;
  console.log(roomData);

  const micbuttonhandler = () => {
    setMicOn(!micon);
  };

  const cambuttonhandler = () => {
    setCamOn(!camon);
  };

  const [state, setState] = useState({
    mySessionId: 'SessionA',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });
  const navigate = useNavigate();

  const OV = useRef(null);

  const getUserName = localStorage.getItem('member');

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
    setState((prevState) => ({ ...prevState, session: mySession }));
  };

  useEffect(() => {
    joinSession();
  }, []);

  useEffect(() => {
    if (state.session) {
      const handleStream = (event) => {
        let subscriber = state.session.subscribe(event.stream, undefined);
        setState((prevState) => ({
          ...prevState,
          subscribers: [...prevState.subscribers, subscriber],
        }));
      };

      const handleStreamDestroyed = (event) => {
        deleteSubscriber(event.stream.streamManager);
      };

      const handleException = (exception) => {
        console.warn(exception);
      };

      state.session.on('stream', handleStream);
      state.session.on('streamDestroyed', handleStreamDestroyed);
      state.session.on('exception', handleException);

      (async function connectToken() {
        try {
          const token = await getToken();
          await state.session.connect(token, { clientData: state.myUserName });

          const publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '960x540',
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
        } catch (error) {
          console.log(
            '세션에 연결하는 중 오류가 발생했습니다:',
            error.code,
            error.message
          );
        }
      })();

      return () => {
        state.session.off('stream', handleStream);
        state.session.off('streamDestroyed', handleStreamDestroyed);
        state.session.off('exception', handleException);
      };
    }
  }, [state.session]);

  const leaveSession = () => {
    const mySession = state.session;

    if (mySession) {
      mySession.disconnect();
    }
    navigate(-1);
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
  return (
    <Stcontainer>
      <StLayout>
        <StViewArea>
          <Stheader>
            <Sttimertext>
              <div>00:00:00</div>
              <img src={play} alt="" />
            </Sttimertext>
            <Sttitlebox>
              <Sttitle>{roomData?.roomName}</Sttitle>
              <Stroomcount>
                <span>1 / 9</span>
                <img src={Vector} alt="" />
              </Stroomcount>
            </Sttitlebox>
          </Stheader>
          <Stcamarea ischatOpen={ischatOpen}>
            {/* <Stcambox> */}
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} userName={getUserName} />
              </div>
            ) : null}
            {/* </Stcambox> */}
          </Stcamarea>
          <Stfooter>
            <Stsettingbox>
              {micon ? (
                <Sticon src={micOn} alt="" onClick={micbuttonhandler} />
              ) : (
                <Sticon src={micoff} alt="" onClick={micbuttonhandler} />
              )}
              {camon ? (
                <Sticon src={camOn} alt="" onClick={cambuttonhandler} />
              ) : (
                <Sticon src={camoff} alt="" onClick={cambuttonhandler} />
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
              <Sticon src={logout} alt="" onClick={leaveSession} />
            </Stsettingbox>
          </Stfooter>
        </StViewArea>
        {/* 채팅창 */}
        {ischatOpen ? (
          <div>
            <StChatarea>
              <Stchatheader>
                <div>
                  <img src={logo} alt="" />
                  <Stchatheaderfont>대화창</Stchatheaderfont>
                </div>
                <Stcancelbutton
                  src={cancel}
                  alt=""
                  onClick={() => {
                    setisChatOpen(false);
                  }}
                />
              </Stchatheader>
              <Stchatbox>
                {/* 보내는 메시지 */}
                <StTochat>
                  <StchattextArea>
                    <StTochatinner>
                      <StchatTime>00/00 00:00</StchatTime>
                      <StTochatName>이름</StTochatName>
                    </StTochatinner>
                    <Stchattext>채팅내용 입력</Stchattext>
                  </StchattextArea>
                  <img src={profileimg} alt="" />
                </StTochat>
                {/* 받는 메시지 */}
                <StFromchat>
                  <StchattextArea>
                    <StTochatinner>
                      <StFromchatName>이름</StFromchatName>
                      <StchatTime>00/00 00:00</StchatTime>
                    </StTochatinner>
                    <StFromchattext>채팅내용 입력</StFromchattext>
                  </StchattextArea>
                  <img src={profileimg} alt="" />
                </StFromchat>
              </Stchatbox>
              <Stsendarea>
                <Stchatinput />
                <Stsendbutton src={send} alt="" />
              </Stsendarea>
            </StChatarea>
          </div>
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
    @media (max-width: 970px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: 971px) and (max-width: 1349px) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: 1350px) {
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

const StChatarea = styled.div`
  width: 329px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-left: 1px solid #bfbfbf;
`;

const Stchatbox = styled.div`
  width: 280px;
  height: 906px;
  border: 1px solid #bfbfbf;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const Stchatinput = styled.input`
  width: 231px;
  height: 36px;
  border: 1px solid #bfbfbf;
  border-radius: 7px;
  padding-left: 10px;
`;

const Stsendarea = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const Stsendbutton = styled.img`
  cursor: pointer;
`;

const Stcancelbutton = styled.img`
  cursor: pointer;
`;
const Stchatheader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
`;

const Stchatheaderfont = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-left: 11px;
`;

const StTochat = styled.div`
  height: 74px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const StTochatinner = styled.div`
  display: flex;
  align-items: center;
  gap: 79.19px;
`;
const StchattextArea = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

const StchatTime = styled.div`
  color: #9d9d9d;
  font-size: 14px;
  font-weight: 500;
`;
const StTochatName = styled.div`
  color: #00573f;
  font-size: 15px;
  font-weight: 700;
`;
const StFromchatName = styled.div`
  color: black;
  font-size: 15px;
  font-weight: 700;
`;
const Stchattext = styled.div`
  display: flex;
  justify-content: end;
  font-size: 15px;
  font-weight: 500;
`;
const StFromchattext = styled.div`
  display: flex;
  justify-content: start;
  font-size: 15px;
  font-weight: 500;
`;
const StFromchat = styled.div`
  height: 74px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 15px;
`;

const Stcamarea = styled.div`
  width: ${({ ischatOpen }) => (ischatOpen ? '1264px' : '1464px')};
  height: 771px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 기본적으로 3 열로 표시.
  grid-gap: 8px 8px;
  transform: translateY(-20px);

  ${size.md`
    width: 1200px;
  `}

  ${size.xs`
    grid-template-columns: repeat(2, 1fr);
    width: 650px
  `}
`;

const Stcambox = styled.div`
  /* width: 547px;
  height: 308px; */
  background-color: black;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 14px;

  ${size.xs`
    // 최소 화면 크기 설정
    width: 100%;
  `}

  ${size.md`
    // 중간 화면 크기 설정
    width: 100%;
  `}

  ${size.lg`
    // 최대 화면 크기 설정
    width: 100%;
  `}
`;

const Stcamboxname = styled.div`
  width: 68px;
  height: 30px;
  background-color: #424242;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15px;
  font-weight: 500;
`;

const Stheader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 57px;
  margin-top: 65px;
  gap: 10px;
  width: 80%;
`;
const Sttimertext = styled.div`
  color: #00573f;
  font-size: 52px;
  font-weight: 700;
  gap: 27px;
  display: flex;
`;

const Sttitlebox = styled.div`
  font-weight: 700;
  font-size: 26px;
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
`;

const Stsettingbox = styled.div`
  width: 424px;
  height: 64px;
  background-color: rgba(66, 66, 66, 0.8);
  gap: 40px;
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
  cursor: pointer;
`;

const Stroomcount = styled.span`
  color: #90b54c;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`;
