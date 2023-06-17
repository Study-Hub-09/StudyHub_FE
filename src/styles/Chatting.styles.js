import styled from 'styled-components';

export const StChatContainer = styled.form`
  width: 329px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-left: 1px solid #424242;
  padding-block: 10px;
`;

export const StChatBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
`;

export const StChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  width: 280px;
  h3 {
    color: var(--color-white);
  }
`;

export const StChatHeaderRight = styled.div``;

export const StChatArea = styled.div`
  border: 1px solid #bfbfbf;
  background-color: white;
  width: 280px;
  height: 100%;
  border-radius: 7px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  overflow: auto;
`;

export const StChatTextBox = styled.div`
  border: 1px solid blue;
  padding: 5px;
`;

export const StChatTextTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StChatTextTitleUser = styled.div`
  display: flex;
  gap: 5px;

  img {
    width: 25px;
    height: 25px;
  }

  p {
    font-weight: var(--weight-bold);
  }
`;

export const StChatTextTitleTime = styled.div`
  font-size: 14px;
  color: var(--color-gray);
`;

export const StChatTextContent = styled.div`
  p {
    margin-left: ${(props) => props.marginleft};
    text-align: ${(props) => props.textalign};
    margin-right: ${(props) => props.marginright};
  }
`;

export const StChatInput = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 231px;
    height: 36px;
    border: 1px solid #bfbfbf;
    border-radius: 7px;
    padding-left: 10px;
    background-color: white;
    align-self: center;
  }
`;

export const StSendButton = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Stchatbox = styled.div`
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

export const Stchatinput = styled.input`
  width: 231px;
  height: 36px;
  border: 1px solid #bfbfbf;
  border-radius: 7px;
  padding-left: 10px;
  background-color: white;
`;

export const Stsendarea = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

export const Stsendbutton = styled.img`
  cursor: pointer;
`;

export const Stcancelbutton = styled.img`
  width: 15px;
  cursor: pointer;
`;

export const Stchatheaderfont = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-left: 11px;
  color: #b6b6b6;
`;

export const StTochat = styled.div`
  height: 74px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

export const StTochatinner = styled.div`
  display: flex;
  align-items: center;
  gap: 79.19px;
`;
export const StchattextArea = styled.div`
  width: 240px;
  display: flex;
  justify-content: space-between;
`;

export const StchatTime = styled.div`
  color: #9d9d9d;
  font-size: 14px;
  font-weight: 500;
`;
export const StTochatName = styled.div`
  color: #00573f;
  font-size: 15px;
  font-weight: 700;
`;
export const StFromchatName = styled.div`
  color: black;
  font-size: 15px;
  font-weight: 700;
`;
export const Stchattext = styled.p`
  font-size: 15px;
  font-weight: 500;
  text-align: right;
  width: 195px;
`;
export const StFromchattext = styled.p`
  display: flex;
  justify-content: start;
  font-size: 15px;
  font-weight: 500;
`;
export const StFromchat = styled.div`
  height: 74px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 15px;
`;
