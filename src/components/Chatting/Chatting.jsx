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
  StChatTextBox,
  StChatTextTitle,
  StChatTextTitleUser,
  StChatTextTitleTime,
  StChatTextContent,
  StChatInput,
  StSendButton,
  StChatmessage,
} from '../../styles/Chatting.styles';

function Chatting({ onChange, onSubmit, onClick, message, chatDatas, getUserName }) {
  const chatDisplayRef = useRef(null);
  console.log('chatDatas>>>> ', chatDatas);

  // 메시지가 추가될 때마다 자동 스크롤
  useEffect(() => {
    chatDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatDatas]);
  return (
    <StChatContainer onSubmit={onSubmit}>
      {/* 채팅 헤더 */}
      <StChatHeader>
        <StChatHeaderLeft>
          <img src={logo} alt="" width={32} />
          <h3>대화창</h3>
        </StChatHeaderLeft>
        <StChatHeaderRight>
          <img src={cancel} alt="" onClick={onClick} />
        </StChatHeaderRight>
      </StChatHeader>
      {/* 채팅 창 영역 */}
      <StChatArea ref={chatDisplayRef}>
        {chatDatas.map((chatData, id) => {
          // const previousChatData = chatDatas[id - 1]; // 이전 채팅 데이터
          // const isSameUser = previousChatData?.nickname === chatData.nickname; // 이전 채팅과 같은 사용자인지 확인
          // const isSameTime = previousChatData?.createdAt === chatData.createdAt; // 이전 채팅과 같은 시간인지 확인
          console.log(chatData);
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
                <StChatmessage marginleft={!isOwnMessage && '30px'}>
                  {chatData.message}
                </StChatmessage>
              </StChatTextContent>
            </div>
          );
        })}
        <div ref={chatDisplayRef}></div>
      </StChatArea>

      {/* 채팅 입력 영역 */}
      <StChatInput>
        <input type="text" value={message} onChange={onChange} />
        <StSendButton>
          <button>
            <img src={send} alt="" />
          </button>
        </StSendButton>
      </StChatInput>
    </StChatContainer>
  );
}

export default Chatting;
