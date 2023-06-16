import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import cancel from '../../asset/cancel.svg';
import logo from '../../asset/logo.svg';
import profileimg from '../../asset/user.svg';
import send from '../../asset/send.svg';

function Chatting({ onChange, onSubmit, onClick, message, chatDatas, getUserName }) {
  const chatDisplayRef = useRef(null);
  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    return `${month}/${day}`;
  };

  // 메시지가 추가될 때마다 자동 스크롤
  useEffect(() => {
    const chatDisplayElement = chatDisplayRef.current;
    chatDisplayElement.scrollTop = chatDisplayElement.scrollHeight;
  }, [chatDatas]);

  return (
    <StChatarea onSubmit={onSubmit}>
      <Stchatheader>
        <div>
          <img src={logo} alt="" />
          <Stchatheaderfont>대화창</Stchatheaderfont>
        </div>
        <Stcancelbutton src={cancel} alt="" onClick={onClick} />
      </Stchatheader>
      <Stchatbox ref={chatDisplayRef}>
        {/* 보내는 메시지 */}
        {chatDatas.map((chatData, id) => {
          return (
            <div key={id}>
              {chatData.nickname === getUserName ? (
                <StTochat>
                  <StchattextArea>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '200px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          width: '195px',
                          justifyContent: 'space-between',
                        }}
                      >
                        <StchatTime>
                          {getCurrentDate()} {chatData.createdAt}
                        </StchatTime>
                        <StTochatName>{chatData.nickname}</StTochatName>
                      </div>
                      <div>
                        <Stchattext>{chatData.message}</Stchattext>
                      </div>
                    </div>

                    <div>
                      <img src={profileimg} alt="" />
                    </div>
                  </StchattextArea>
                </StTochat>
              ) : (
                <StTochat>
                  <StchattextArea>
                    <div>
                      <img src={profileimg} alt="" />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '200px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          width: '195px',
                          justifyContent: 'space-between',
                        }}
                      >
                        <StTochatName>{chatData.nickname}</StTochatName>
                        <StchatTime>
                          {getCurrentDate()} {chatData.createdAt}
                        </StchatTime>
                      </div>
                      <div>
                        <Stchattext style={{ textAlign: 'left' }}>
                          {chatData.message}
                        </Stchattext>
                      </div>
                    </div>
                  </StchattextArea>
                </StTochat>
              )}
            </div>
          );
        })}
      </Stchatbox>
      <Stsendarea>
        <Stchatinput type="text" value={message} onChange={onChange} />
        <button>
          <Stsendbutton src={send} alt="" />
        </button>
      </Stsendarea>
    </StChatarea>
  );
}

export default Chatting;

const StChatarea = styled.form`
  width: 329px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-left: 1px solid #b6b6b6;
  padding: 10px 0px;
`;

const Stchatbox = styled.div`
  background-color: white;
  width: 280px;
  height: 100%;
  border: 1px solid #bfbfbf;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 15px; /* 스크롤 바 너비 */
    height: 100px;
    background-color: red;
  }

  &::-webkit-scrollbar-thumb {
    /* 스크롤바 색상 */
    background-color: #4f1414;
  }

  &::-webkit-scrollbar-track {
    /* 스크롤 바 트랙 색상 */
    border-left: 2px solid #106511;
    background-color: blue;
  }
`;

const Stchatinput = styled.input`
  width: 231px;
  height: 36px;
  border: 1px solid #bfbfbf;
  border-radius: 7px;
  padding-left: 10px;
  background-color: white;
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
  color: #b6b6b6;
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
  width: 240px;
  display: flex;
  justify-content: space-between;
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
const Stchattext = styled.p`
  font-size: 15px;
  font-weight: 500;
  text-align: right;
  width: 195px;
`;
const StFromchattext = styled.p`
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
