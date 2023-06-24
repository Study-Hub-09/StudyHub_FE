import React, { useEffect, useRef } from 'react';
import cancel from '../../asset/cancel_white.svg';
import logo from '../../asset/logo.svg';
import profileimg from '../../asset/user.svg';
import send from '../../asset/send.svg';
import {
  StChatContainer,
  StChatHeader,
  StChatHeaderLeft,
  StChatHeaderRight,
  StChatArea,
  StChatTextTitle,
  StChatTextTitleUser,
  StChatTextTitleTime,
  StChatTextContent,
  StChatInput,
  StSendButton,
  StChatmessage,
  StMessageContainer,
} from '../../styles/Chatting.styles';

function Chatting({ onChange, onSubmit, onClick, message, chatDatas, getUserName }) {
  const chatDisplayRef = useRef(null);
  // 메시지가 추가될 때마다 자동 스크롤
  useEffect(() => {
    chatDisplayRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [chatDatas]);
  return (
    <StChatContainer onSubmit={onSubmit}>
      {/* 채팅 헤더 */}
      <StChatHeader>
        <StChatHeaderLeft>
          <img src={logo} alt="logoImage unable" width={32} />
          <h3>대화창</h3>
        </StChatHeaderLeft>
        <StChatHeaderRight>
          <img src={cancel} alt="cancelImage unable" onClick={onClick} />
        </StChatHeaderRight>
      </StChatHeader>
      {/* 채팅 창 영역 */}
      <StChatArea>
        <StMessageContainer>
          {chatDatas.map((chatData, id) => {
            const isOwnMessage = chatData.nickname === getUserName;

            const isLastMessageOfBlock =
              (id < chatDatas.length - 1 &&
                chatDatas[id + 1].nickname !== chatData.nickname) ||
              id === chatDatas.length - 1;

            const isDifferentTime =
              id < chatDatas.length - 1 &&
              chatDatas[id + 1].createdAt !== chatData.createdAt;

            const isFirstMessageOfBlock =
              id === 0 || chatDatas[id - 1].nickname !== chatData.nickname;

            return (
              <div key={id}>
                <StChatTextContent textalign={isOwnMessage ? 'right' : 'left'}>
                  <StChatTextTitle>
                    {!isOwnMessage && isFirstMessageOfBlock && (
                      <>
                        <StChatTextTitleUser color="var(--color-dark-green)">
                          <img src={profileimg} alt="Guest Profile" />
                          <p>{chatData.nickname} </p>
                        </StChatTextTitleUser>
                        {/* 사용자 프로필 옆에 chatData.createdAt 표시하기 */}
                        <StChatTextTitleTime>{chatData.createdAt}</StChatTextTitleTime>
                      </>
                    )}
                    {isOwnMessage && (isLastMessageOfBlock || isDifferentTime) && (
                      <StChatTextTitleTime>{chatData.createdAt}</StChatTextTitleTime>
                    )}
                  </StChatTextTitle>
                  <StChatmessage marginleft={!isOwnMessage ? '30px' : undefined}>
                    {chatData.message}
                  </StChatmessage>
                </StChatTextContent>
              </div>
            );
          })}
          <div ref={chatDisplayRef} style={{ height: '10px' }}></div>
        </StMessageContainer>
      </StChatArea>

      {/* 채팅 입력 영역 */}
      <StChatInput>
        <input type="text" value={message} onChange={onChange} />
        <StSendButton>
          <button>
            <img src={send} alt="sendImage unable" />
          </button>
        </StSendButton>
      </StChatInput>
    </StChatContainer>
  );
}

export default Chatting;
