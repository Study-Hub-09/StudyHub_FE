import styled from 'styled-components';

export const StChatContainer = styled.form`
  width: 329px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-left: 1px solid var(--color-dark-gray);
  padding-block: 10px;
  overflow: auto;
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
  border: 1px solid var(--color-argent);
  background-color: white;
  width: 280px;
  height: 100%;
  border-radius: 7px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: auto; /* 수정된 부분 */
`;
export const StMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
`;

export const StChatTextTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const StChatTextTitleUser = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  color: ${(props) => props.color};

  p {
    font-weight: var(--weight-bold);
  }
`;

export const StChatUserProfileImg = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const StChatTextTitleTime = styled.span`
  font-size: 12px;
  color: var(--color-gray);
  margin: 0px 10px;
`;

export const StChatTextContent = styled.div`
  display: ${(props) => (props.textalign === 'right' ? 'flex' : 'block')};
  justify-content: ${(props) => (props.textalign === 'right' ? 'end' : 'start')};
  align-items: center;
  margin-left: ${(props) => props.marginleft};
`;

export const StChatInput = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;

  input {
    width: 231px;
    height: 36px;
    border: 1px solid var(--color-argent);
    border-radius: 7px;
    padding-left: 10px;
    background-color: white;
    align-self: center;
  }
`;
export const StChatTextTitleTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: blue;
`;
export const StSendButton = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StChatmessage = styled.p`
  margin-left: ${(props) => props.marginleft};
`;
