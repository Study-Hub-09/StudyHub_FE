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
} from '../../styles/Chatting.styles';

function Chatting({ onChange, onSubmit, onClick, message, chatDatas, getUserName }) {
  const chatDisplayRef = useRef(null);
  console.log('chatDatas>>>> ', chatDatas);

  // 메시지가 추가될 때마다 자동 스크롤
  useEffect(() => {
    // const chatDisplayElement = chatDisplayRef.current;
    // chatDisplayElement.scrollTop = chatDisplayElement.scrollHeight;
    // console.log(chatDisplayElement.scrollTop);
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
          return (
            // <div key={id}>
            //   {chatData.nickname === getUserName ? (
            //     <StChatTextBox>
            //       <StChatTextTitle>
            //         <StChatTextTitleTime>{chatData.createdAt}</StChatTextTitleTime>
            //         <StChatTextTitleUser color="var(--color-dark-green)">
            //           <p>{chatData.nickname}</p>
            //         </StChatTextTitleUser>
            //       </StChatTextTitle>
            //       <StChatTextContent textalign="right">
            //         <p>{chatData.message}</p>
            //       </StChatTextContent>
            //     </StChatTextBox>
            //   ) : (
            //     <StChatTextBox>
            //       <StChatTextTitle>
            //         <StChatTextTitleUser>
            //           <img src={profileimg} alt="Guest Profile" />
            //           <p>{chatData.nickname}</p>
            //         </StChatTextTitleUser>
            //         <StChatTextTitleTime>{chatData.createdAt}</StChatTextTitleTime>
            //       </StChatTextTitle>
            //       <StChatTextContent textalign="left" marginleft="30px">
            //         <p>{chatData.message}</p>
            //       </StChatTextContent>
            //     </StChatTextBox>
            //   )}
            // </div>
            <div key={id}>
              {chatData.nickname === getUserName ? (
                <StChatTextBox>
                  <StChatTextTitle>
                    <StChatTextTitleTime>{chatData.createdAt}</StChatTextTitleTime>
                    <StChatTextContent textalign="right">
                      <p>{chatData.message}</p>
                    </StChatTextContent>
                  </StChatTextTitle>
                </StChatTextBox>
              ) : (
                <StChatTextBox>
                  <StChatTextTitle>
                    <StChatTextTitleUser color="var(--color-dark-green)">
                      <img src={profileimg} alt="Guest Profile" />
                      <p>{chatData.nickname}</p>
                    </StChatTextTitleUser>
                    <StChatTextTitleTime>{chatData.createdAt}</StChatTextTitleTime>
                  </StChatTextTitle>
                  <StChatTextContent textalign="left" marginleft="30px">
                    <p>{chatData.message}</p>
                  </StChatTextContent>
                </StChatTextBox>
              )}
            </div>
          );
        })}
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
