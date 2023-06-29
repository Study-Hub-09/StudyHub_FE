import styled from 'styled-components';

export const StMainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: rgba(236, 243, 223, 0.1);
  flex-direction: column;
`;

export const StHeaderContainer = styled.div`
  width: 100%;
  height: 23.5%;
  display: flex;
  /* border: 1px solid #ff8d8d; */
`;

export const StHeaderLeft = styled.div`
  width: 20%;
  /* border: 1px solid #ff8d8d; */
`;

export const StHeaderMain = styled.div`
  width: 59.2%;
  display: flex;
  /* border: 1px solid #ff8d8d; */
`;

export const StHeaderMainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  /* border: 1px solid #ff8d8d; */
`;

export const StHeaderUserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  height: 30%;
  margin-bottom: 3rem;
  /* border: 1px solid #ff8d8d; */
`;

export const StHeaderUserName = styled.div`
  width: 100%;
  height: 59%;
  font-style: normal;
  font-weight: var(--weight-bold);
  font-size: 2vw;
  line-height: 2.75rem;
  color: var(--color-black);
  margin: 0rem 0rem 0.563rem 0rem;
  /* border: 1px solid #ff8d8d; */
`;

export const StHeaderUserIntro = styled.div`
  font-style: normal;
  font-weight: var(--weight-regular);
  font-size: 1.12vw;
  line-height: 120%;
  color: var(--color-gray);
  /* border: 1px solid #ff8d8d; */
`;

export const StContentContainer = styled.div`
  width: 100%;
  height: 76.5%;
  display: flex;
  /* border: 1px solid #8cacff; */
`;

export const StContentLeft = styled.div`
  width: 20%;
  /* border: 1px solid #8cacff; */
`;

export const StContentMain = styled.div`
  width: 59.2%;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainContainerT = styled.div`
  width: 100%;
  height: 42.5%;
  display: flex;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTime = styled.div`
  box-sizing: border-box;
  width: 59%;
  background: var(--color-white);
  border: 1px solid var(--color-argent);
  border-radius: 12px;
  margin-right: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimeLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimeHead = styled.div`
  width: 100%;
  height: 17.5%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimeTitel = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 54%;
  margin: 6% 0% 0% 14%;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimeText = styled.div`
  width: 53%;
  height: 100%;
  font-style: normal;
  font-weight: var(--weight-bold);
  font-size: 1.389vw;
  line-height: 1.688rem;
  color: var(--color-black);
  margin-right: 5%;
  display: flex;
  justify-content: center;
`;

export const StContentMainTotalTimeText2 = styled.div`
  width: 38%;
  height: 70%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.972vw;
  line-height: 1.188rem;
  color: var(--color-old-silver);
`;

export const StContentMainTotalTimeBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimeView = styled.div`
  width: 55%;
  height: 72%;
  background: var(--color-spotlight-green);
  border-radius: 14.266px;
  margin: 0vw 1.042vw 0vw 0.694vw;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimeViewT = styled.div`
  width: 38.3%;
  height: 20.5%;
  font-style: normal;
  font-weight: var(--weight-bold);
  font-size: 2.222vw;
  line-height: 2.75rem;
  color: var(--color-dark-charcoal);
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimerLayout = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  /* justify-content: flex-end; */
  margin: 0rem 0rem 1.563rem 0rem;
  width: 33%;
  height: 60%;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimerTitle = styled.div`
  width: 100%;
  height: 12%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.972vw;
  line-height: 1.25rem;
  color: var(--color-sonic-silver);
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTotalTimer = styled.div`
  width: 100%;
  height: 23%;
  font-style: normal;
  font-weight: var(--weight-bold);
  font-size: 1.806vw;
  line-height: 2.188rem;
  color: var(--color-dark-charcoal);
  margin: 0.313rem 0rem 0.5rem 0rem;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainContainerB = styled.div`
  width: 100%;
  height: 37.8%;
  display: flex;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainStatistics = styled.div`
  box-sizing: border-box;
  width: 53%;
  background: var(--color-white);
  border: 1px solid var(--color-argent);
  border-radius: 12px;
  margin: 1% 1% 0% 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainStatisticsTitleH = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  height: 10%;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainStatisticsTitl = styled.div`
  width: 20%;
  height: 100%;
  font-style: normal;
  font-weight: var(--weight-bold);
  font-size: 1.389vw;
  line-height: 1.688rem;
  color: var(--color-dark-charcoal);
  margin-right: 2.813rem;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainStatisticsTitlBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 53%;
  height: 100%;
  background: var(--color-cultured-white);
  border-radius: 3.34103px;
  margin-right: 8px;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainStatisticsTitlBoxList = styled.div`
  width: 6%;
  height: 70%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1rem;
  color: var(--color-old-silver);
  cursor: pointer;
  &:hover {
    width: 20%;
    height: 70%;
    padding: 0px 0px 0px 12px;
    margin: 0px -15px 0px -12px;
    background: var(--color-white);
  }
`;

export const StContentMainStatisticsTitlBoxList2 = styled.div`
  width: 6%;
  height: 70%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1rem;
  color: var(--color-old-silver);
  cursor: pointer;
  &:hover {
    width: 20%;
    height: 70%;
    padding: 0px 0px 0px 12px;
    margin: 0px -12px 0px -12px;
    background: var(--color-white);
  }
`;

export const StContentMainStatisticsTitlBoxList3 = styled.div`
  width: 6%;
  height: 70%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1rem;
  color: var(--color-old-silver);
  cursor: pointer;
  &:hover {
    width: 20%;
    height: 70%;
    padding: 0px 0px 0px 12px;
    margin: 0px -15px 0px -12px;
    background: var(--color-white);
  }
`;

export const StContentMainStatisticsGraph = styled.div`
  width: 100%;
  height: 63%;
  margin: 1.25rem 0rem 0rem 0rem;
  display: flex;
  justify-content: center;
  /* background: #eaeaea; */
  /* border: 1px solid #8cacff; */
`;

export const StContentMainSubContainer = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTitelRank = styled.div`
  width: 100%;
  height: 46%;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
