import { styled, css } from 'styled-components';

// ==============ROOM STYLE=========== //
export const size = {
  xs: (...args) => css`
    @media (max-width: 1366px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (min-width: 1367px) and (max-width: 1500px) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: 1501px) {
      ${css(...args)}
    }
  `,
};

export const Stcontainer = styled.div`
  background-color: #1e1e1e;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const StViewArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  flex: 1;
`;

export const Stcamarea = styled.div`
  width: ${({ ischatOpen }) => (ischatOpen ? '80%' : '70%')};
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 기본적으로 3 열로 표시.
  grid-gap: 8px 8px;
  transform: translateY(-20px);
`;

export const Stheader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 3rem;
  gap: 1vw;
  width: ${({ ischatOpen }) => (ischatOpen ? '80%' : '70%')};
`;

export const Sttitlebox = styled.div`
  font-weight: var(--weight-bold);
  font-size: 1.35vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Sttitle = styled.div`
  color: #b6b6b6;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-left: 4vw;
`;

export const Stsettingbox = styled.div`
  width: 22vw;
  height: 6vh;
  background-color: rgba(66, 66, 66, 0.8);
  gap: 2.1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const Stfooter = styled.div`
  display: flex;
  align-items: end;
`;

export const Sticon = styled.img`
  width: 1.7vw;
  cursor: pointer;
`;

export const Stroomcount = styled.span`
  color: var(--color-light-green);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;
export const Stusericon = styled.img`
  width: 1.2vw;
`;

// ==============USER VIDEO COMPONENT STYLE=========== //

export const Stcambox = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  background-color: #d8deca;
  position: relative;
`;
export const Stcamboxname = styled.div`
  background-color: var(--color-dark-gray);
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.795vw;
  font-weight: 500;
  position: absolute;
  bottom: 0.684vw;
  left: 0.756vw;
  padding: 0.261vw 0.678vw;
  z-index: 2;
`;
export const StmicMuteIcon = styled.img`
  position: absolute;
  right: 7.99px;
  bottom: 8.11px;
  z-index: 1;
  width: 1.875vw;
`;

export const StUserCam = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d8deca;
  position: absolute;
`;
export const StUserimg = styled.img`
  width: 5.21vw;
`;

// ==============OV VIDEO COMPONENT STYLE=========== //
export const Stvideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
