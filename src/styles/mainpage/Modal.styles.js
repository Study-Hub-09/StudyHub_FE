import { css, keyframes, styled } from 'styled-components';

export const Stcontainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Stmodalbox = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 987px;
  height: 503px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
  padding: 36px, 56px, 60px;
  gap: 10px;
`;

export const StmadalLayout = styled.div`
  width: 875px;
  height: 332px;
  display: flex;
  justify-content: space-between;
`;

export const StmodalLeft = styled.div`
  width: 417.19px;
  height: 316px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StmodalRight = styled.div`
  width: 417.19px;
  height: 316px;
`;

export const Stline = styled.div`
  height: 316px;
  border-left: 1.5px solid #bfbfbf;
`;

export const StCircle = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  background-color: ${(props) => (props.isSelected ? '#00573f' : '#e8e8e8')};
  gap: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
`;

export const Stcategory = styled.div`
  width: 316px;
  height: 152px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 12px 12px;
`;

export const StinputA = styled.input`
  background-color: #e8e8e8;
  width: 184px;
  height: 32px;
  border-radius: 12px;
  padding: 0px 14px;
  font-size: 15px;
`;

export const StinputB = styled.textarea`
  display: block;
  background-color: #e8e8e8;
  width: 261px;
  height: 57px;
  border-radius: 12px;
  padding: 9px 13.81px;
  padding-bottom: 24px;
  font-size: 15px;
`;

export const Stroomnamebox = styled.div`
  height: 63px;
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const Stcontentbox = styled.div`
  height: 71px;
  display: flex;
  gap: 53px;
`;

export const Stcatebox = styled.div`
  height: 166px;
  display: flex;
  gap: 20.19px;
`;

export const Stfont = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const Sttitle = styled.div`
  width: 875px;
  font-size: 20px;
  font-weight: 700;
`;

export const Stthumbnail = styled.div`
  width: 136px;
  height: 100px;
  background-color: #e8e8e8;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StthumbnailbuttonA = styled.button`
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 4px;
  &:hover {
    background-color: #e8e8e8;
  }
`;
export const StthumbnailbuttonB = styled.label`
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    background-color: #e8e8e8;
  }
`;

export const StpasswordInput = styled.input`
  width: 68px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 7px;
  padding-left: 14px;
  border: 1px solid #9d9d9d;
  margin-left: 14px;
`;

export const Stcreatebutton = styled.button`
  transform: translateY(-50px);
  width: 90px;
  height: 44px;
  border: 1px solid #bfbfbf;
  border-radius: 30px;
  color: #9d9d9d;
  font-size: 15px;
  font-weight: 700;
  &:hover {
    background-color: #00573f;
    color: #ffffff;
  }
`;

export const Stlockbutton = styled.button`
  display: flex;
  align-items: center;
  width: 36px;
`;

export const Stlockbuttonbg = styled.div`
  position: relative;
  width: 36px;
  height: 18px;
  background-color: ${(props) => (props.lock ? '#00573f' : '#bfbfbf')};
  border-radius: 30px;
`;

export const moveForward = keyframes`
  0% {
    transform: translateX(1.53px);
  }
  100% {
    transform: translateX(19.15px);
  }
`;

export const moveBackward = keyframes`
  0% {
    transform: translateX(19.15px);
  }
  100% {
    transform: translateX(1.53px);
  }
`;

export const StlockbuttonBall = styled.div`
  position: absolute;
  width: 14.5px;
  height: 14.5px;
  border-radius: 30px;
  background-color: #ffffff;
  z-index: 1;
  transform: ${(props) => (props.lock ? 'translateX(19.15px)' : 'translateX(1.53px)')};
  ${(props) =>
    props.animate &&
    css`
      animation: ${props.lock ? moveForward : moveBackward} 0.2s linear;
    `}
`;
export const Stdatepickerbox = styled.div`
  display: flex;
  align-items: center;
  gap: 53.19px;
  margin-bottom: 31px;
`;
export const Stthumnailarea = styled.div`
  height: 100px;
  display: flex;
  gap: 20.19px;
`;
export const Stthumnailbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  height: 140px;
`;
export const Stlockbox = styled.div`
  height: 166px;
  display: flex;
  gap: 20.19px;
  padding-top: 38px;
  margin-top: 11px;
`;

export const Stlockboxinner = styled.div`
  gap: 7px;
  display: flex;
  flex-direction: column;
`;

export const Stlayoutbox = styled.div`
  display: flex;
  justify-content: end;
`;

export const Stfontcolor = styled.div`
  color: #9d9d9d;
`;
