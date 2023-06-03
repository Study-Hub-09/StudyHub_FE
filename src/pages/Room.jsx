import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import play from '../asset/play.svg';
import camOn from '../asset/camon.svg';
import camoff from '../asset/camoff.svg';
import chat from '../asset/chat.svg';
import Chevron from '../asset/Chevron.svg';
import micOn from '../asset/micon.svg';
import micoff from '../asset/micoff.svg';
import setting from '../asset/setting2.svg';
import logout from '../asset/logout.svg';
import view from '../asset/view.svg';
import send from '../asset/send.svg';
import cancel from '../asset/cancel.svg';
import logo from '../asset/logo.svg';
import profileimg from '../asset/user.svg';
import viewmic from '../asset/viewmic.svg';
import Vector from '../asset/Vector.svg';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRoomDetail } from '../api/api';
import UserVideoComponent from '../components/UserVideoComponent';
function Room({
  roomData,
  publisher,
  handleMainVideoStream,
  mainStreamManager,
  leaveSession,
}) {
  const [micon, setMicOn] = useState(false);
  const [camon, setCamOn] = useState(false);
  const [ischatOpen, setisChatOpen] = useState(false);
  const params = useParams();
  //   console.log(params.id);
  // const { isLoading, isError, data } = useQuery('room', () => getRoomDetail(params.id));
  // if (isLoading) {
  //   return <p>로딩중입니다....!</p>;
  // }

  // if (isError) {
  //   return <p>오류가 발생하였습니다...!</p>;
  // }
  // const roomData = data?.data;
  const micbuttonhandler = () => {
    setMicOn(!micon);
  };

  const cambuttonhandler = () => {
    setCamOn(!camon);
  };
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
            <Stcamboxname>닉네임</Stcamboxname>
            {mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent streamManager={mainStreamManager} />
              </div>
            ) : null}
            <img src={viewmic} alt="" width={36} height={36} />
            {/* </Stcambox> */}
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
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
