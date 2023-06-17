import React, { useEffect, useRef } from 'react';
import cancel from '../../asset/cancel_white.svg';
import logo from '../../asset/logo.svg';
import profileimg from '../../asset/user.svg';
import send from '../../asset/send.svg';
import {
  StChatContainer,
  StChatBox,
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
  StchatTime,
  StTochat,
  StTochatName,
  Stchattext,
  StchattextArea,
  Stcancelbutton,
  Stchatbox,
  Stsendarea,
  Stchatinput,
  Stsendbutton,
} from '../../styles/Chatting.styles';

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
    // <StChatContainer onSubmit={onSubmit}>
    //   <StChatHeader>
    //     <StChatHeaderLeft>
    //       <img src={logo} alt="" width={32} />
    //       <h3>대화창</h3>
    //     </StChatHeaderLeft>
    //     <Stcancelbutton src={cancel} alt="" onClick={onClick} />
    //   </StChatHeader>
    //   <Stchatbox ref={chatDisplayRef}>
    //     {/* 보내는 메시지 */}
    //     {chatDatas.map((chatData, id) => {
    //       return (
    //         <div key={id}>
    //           {chatData.nickname === getUserName ? (
    //             <StTochat>
    //               <StchattextArea>
    //                 <div
    //                   style={{
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     width: '200px',
    //                   }}
    //                 >
    //                   <div
    //                     style={{
    //                       display: 'flex',
    //                       width: '195px',
    //                       justifyContent: 'space-between',
    //                     }}
    //                   >
    //                     <StchatTime>
    //                       {getCurrentDate()} {chatData.createdAt}
    //                     </StchatTime>
    //                     <StTochatName>{chatData.nickname}</StTochatName>
    //                   </div>
    //                   <div>
    //                     <Stchattext>{chatData.message}</Stchattext>
    //                   </div>
    //                 </div>

    //                 <div>
    //                   <img src={profileimg} alt="" />
    //                 </div>
    //               </StchattextArea>
    //             </StTochat>
    //           ) : (
    //             <StTochat>
    //               <StchattextArea>
    //                 <div>
    //                   <img src={profileimg} alt="" />
    //                 </div>
    //                 <div
    //                   style={{
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     width: '200px',
    //                   }}
    //                 >
    //                   <div
    //                     style={{
    //                       display: 'flex',
    //                       width: '195px',
    //                       justifyContent: 'space-between',
    //                     }}
    //                   >
    //                     <StTochatName>{chatData.nickname}</StTochatName>
    //                     <StchatTime>
    //                       {getCurrentDate()} {chatData.createdAt}
    //                     </StchatTime>
    //                   </div>
    //                   <div>
    //                     <Stchattext style={{ textAlign: 'left' }}>
    //                       {chatData.message}
    //                     </Stchattext>
    //                   </div>
    //                 </div>
    //               </StchattextArea>
    //             </StTochat>
    //           )}
    //         </div>
    //       );
    //     })}
    //   </Stchatbox>
    //   <Stsendarea>
    //     <Stchatinput type="text" value={message} onChange={onChange} />
    //     <button>
    //       <Stsendbutton src={send} alt="" />
    //     </button>
    //   </Stsendarea>
    // </StChatContainer>
    <StChatContainer onSubmit={onSubmit}>
      {/* 채팅 헤더 */}
      <StChatHeader>
        <StChatHeaderLeft>
          <img src={logo} alt="" width={32} />
          <h3>대화창</h3>
        </StChatHeaderLeft>
        <StChatHeaderRight>
          <img src={cancel} alt="" />
        </StChatHeaderRight>
      </StChatHeader>
      {/* 채팅 창 영역 */}
      <StChatArea ref={chatDisplayRef}>
        <StChatTextBox>
          <StChatTextTitle>
            <StChatTextTitleUser>
              <img src={profileimg} alt="" />
              <p>Guest</p>
            </StChatTextTitleUser>
            <StChatTextTitleTime>3:26 AM</StChatTextTitleTime>
          </StChatTextTitle>
          <StChatTextContent textalign="left" marginleft="30px">
            <p>Texting..</p>
            <p>Texting..</p>
            <p>Texting..</p>
          </StChatTextContent>
        </StChatTextBox>

        <StChatTextBox>
          <StChatTextTitle>
            <StChatTextTitleTime>3:26 AM</StChatTextTitleTime>
            <StChatTextTitleUser>
              <p>Guest</p>
              <img src={profileimg} alt="" />
            </StChatTextTitleUser>
          </StChatTextTitle>
          <StChatTextContent textalign="right" marginright="30px">
            <p>Texting..</p>
            <p>Texting..</p>
            <p>Texting..</p>
          </StChatTextContent>
        </StChatTextBox>
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
