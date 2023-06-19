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
  border: 1px solid #bfbfbf;
  background-color: white;
  width: 280px;
  height: 100%;
  border-radius: 7px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto; /* 수정된 부분 */

  &::-webkit-scrollbar {
    width: 10px; /* 스크롤 바 너비 */
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

export const StChatTextBox = styled.div`
  padding: 5px;
`;

export const StChatTextTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StChatTextTitleUser = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  color: ${(props) => props.color};

  img {
    width: 25px;
    height: 25px;
  }

  p {
    font-weight: var(--weight-bold);
  }
`;

export const StChatTextTitleTime = styled.div`
  font-size: 12px;
  color: var(--color-gray);
`;

export const StChatTextContent = styled.div`
  p {
    word-break: break-word;
    margin-left: ${(props) => props.marginleft};
    text-align: ${(props) => props.textalign};
    margin-right: ${(props) => props.marginright};
  }
`;

export const StChatInput = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;

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

// export const Stchatbox = styled.div`
//   background-color: white;
//   width: 280px;
//   height: 100%;
//   border: 1px solid #bfbfbf;
//   border-radius: 7px;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   /* overflow-y: auto;
//   scrollbar-width: thin;
//   scrollbar-color: #4f1414 #bfbfbf; */
// `;

// // &::-webkit-scrollbar {
// //     width: 15px; /* 스크롤 바 너비 */
// //     background-color: red;
// //   }

// //   &::-webkit-scrollbar-thumb {
// //     /* 스크롤바 색상 */
// //     background-color: #4f1414;
// //   }

// //   &::-webkit-scrollbar-track {
// //     /* 스크롤 바 트랙 색상 */
// //     border-left: 2px solid #106511;
// //     background-color: blue;
// //   }
