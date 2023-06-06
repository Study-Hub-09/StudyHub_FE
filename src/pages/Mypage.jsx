import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCookie } from '../Cookies/Cookies';
import profileLogo from '../../src/assets/Images/Frame 20.svg';
import sprout from '../../src/assets/Images/sprout.svg';
import Crown from '../../src/assets/Images/👑.svg';
import Arrow from '../../src/assets/Images/Arrow 1.svg';
import Graph from '../components/Graph/Graph';

function Mypage() {
  const nickname = localStorage.member;
  const [token, setToken] = useState('');

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    setToken(accessToken);
  }, []);

  return (
    <StMainContainer>
      <StHeaderContainer>
        <StHeaderLeft></StHeaderLeft>

        <StHeaderMain>
          <StHeaderMainContainer>
            <StHeaderUserNameContainer>
              <StHeaderUserName>Hello, {token ? nickname : 'Guest!'}!</StHeaderUserName>
              <StHeaderUserIntro>나의 모든 공부 데이터 모아보기</StHeaderUserIntro>
            </StHeaderUserNameContainer>

            <StHeaderDdayProfile>
              <StHeaderDday>{token ? 'D-100' : 'D-00'}</StHeaderDday>

              <StHeaderProfile>
                <StHeaderProfileImg src={profileLogo} alt="오류" />
              </StHeaderProfile>
            </StHeaderDdayProfile>
          </StHeaderMainContainer>
        </StHeaderMain>
      </StHeaderContainer>

      <StContentContainer>
        <StContentLeft></StContentLeft>

        <StContentMain>
          <StContentMainContainerT>
            <StContentMainTotalTime>
              <StContentMainTotalTimeLayout>
                <StContentMainTotalTimeHead>
                  <StContentMainTotalTimeTitel>
                    <StContentMainTotalTimeText>공부한 시간</StContentMainTotalTimeText>

                    <StContentMainTotalTimeText2>00.00(월)</StContentMainTotalTimeText2>
                  </StContentMainTotalTimeTitel>
                </StContentMainTotalTimeHead>

                <StContentMainTotalTimeBody>
                  <StContentMainTotalTimeView>
                    <StContentMainTotalTimeViewT>00:00:00</StContentMainTotalTimeViewT>
                  </StContentMainTotalTimeView>

                  <StContentMainTotalTimerLayout>
                    <StContentMainTotalTimerTitle>
                      총 공부 시간
                    </StContentMainTotalTimerTitle>
                    <StContentMainTotalTimer>00:00:00</StContentMainTotalTimer>

                    <StContentMainTotalTimerTitle>
                      이번주 공부 시간
                    </StContentMainTotalTimerTitle>
                    <StContentMainTotalTimer>00:00:00</StContentMainTotalTimer>
                    <StContentMainTotalTimerTitle>
                      지난주 평균 공부시간 <br /> 그 전주보다 늘었습니다.
                    </StContentMainTotalTimerTitle>
                  </StContentMainTotalTimerLayout>
                </StContentMainTotalTimeBody>
              </StContentMainTotalTimeLayout>
            </StContentMainTotalTime>

            <StContentMainTodoList>
              <StContentMainTodoListTitle>
                현재 페이지 <br /> 준비중입니다.
              </StContentMainTodoListTitle>
            </StContentMainTodoList>
          </StContentMainContainerT>

          <StContentMainContainerB>
            <StContentMainStatistics>
              <StContentMainStatisticsTitleH>
                <StContentMainStatisticsTitl>통계</StContentMainStatisticsTitl>

                <StContentMainStatisticsTitlBox>
                  <StContentMainStatisticsTitlBoxList>
                    1D
                  </StContentMainStatisticsTitlBoxList>
                  <StContentMainStatisticsTitlBoxList>
                    1W
                  </StContentMainStatisticsTitlBoxList>
                  <StContentMainStatisticsTitlBoxList>
                    1M
                  </StContentMainStatisticsTitlBoxList>
                  <StContentMainStatisticsTitlBoxList>
                    6M
                  </StContentMainStatisticsTitlBoxList>
                  <StContentMainStatisticsTitlBoxList>
                    1Y
                  </StContentMainStatisticsTitlBoxList>
                </StContentMainStatisticsTitlBox>
              </StContentMainStatisticsTitleH>

              <StContentMainStatisticsGraph>
                <Graph token={token} />
              </StContentMainStatisticsGraph>

              <StContentMainStatisticsSub>
                {/* <StContentMainStatisticsSubT></StContentMainStatisticsSubT> */}
              </StContentMainStatisticsSub>
            </StContentMainStatistics>

            <StContentMainSubContainer>
              <StContentMainTitelRank>
                <StContentMainTitel>
                  <StContentMainMyTitel>내 칭호</StContentMainMyTitel>

                  <StContentMainTitelName>
                    <img src={sprout} alt="오류" />
                    &nbsp; 공부 초보
                  </StContentMainTitelName>

                  <StContentMainTitelEx>
                    <StContentMainTitelNextEx>다음 등급</StContentMainTitelNextEx>
                    <StContentMainTitelNextAro>
                      <img src={Arrow} alt="오류" />
                    </StContentMainTitelNextAro>
                    <StContentMainTitelNextTime>00:00:00</StContentMainTitelNextTime>
                  </StContentMainTitelEx>
                </StContentMainTitel>

                <StContentMainRank>
                  <StContentMainRankTitle>???</StContentMainRankTitle>

                  <StContentMainRankName>
                    <img src={Crown} alt="오류" />
                    &nbsp; 랭킹 유저명
                  </StContentMainRankName>

                  <StContentMainRankEx>
                    <StContentMainRankNextAro>
                      <img src={Arrow} alt="오류" />
                    </StContentMainRankNextAro>
                    <StContentMainRankTime>00:00:00</StContentMainRankTime>
                  </StContentMainRankEx>
                </StContentMainRank>
              </StContentMainTitelRank>

              <StContentMainSubStudyRoom>
                <StContentMainSubStudyRoomTitle>
                  모집 중인 스터디
                </StContentMainSubStudyRoomTitle>
                <StContentMainSubStudyRoomList>
                  <StContentMainSubStudyRoomName>
                    스터디방 이름
                  </StContentMainSubStudyRoomName>
                  <StContentMainSubStudyRoomBtn>입장하기</StContentMainSubStudyRoomBtn>
                </StContentMainSubStudyRoomList>
              </StContentMainSubStudyRoom>
            </StContentMainSubContainer>
          </StContentMainContainerB>
        </StContentMain>
      </StContentContainer>
    </StMainContainer>
  );
}

export default Mypage;

const StMainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: rgba(236, 243, 223, 0.1);
  flex-direction: column;
`;
const StHeaderContainer = styled.div`
  width: 100%;
  height: 254px;
  display: flex;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderLeft = styled.div`
  width: 332px;
  height: 254px;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderMain = styled.div`
  width: calc(100% - 332px);
  height: 254px;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderMainContainer = styled.div`
  width: 995px;
  height: 254px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderUserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 234px;
  height: 75.39px;
  margin-bottom: 48.39px;
`;
const StHeaderUserName = styled.div`
  width: 250px;
  height: 44px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: #000000;
  margin: 0px 0px 9.39px 0px;
`;
const StHeaderUserIntro = styled.div`
  width: 234px;
  height: 22px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  color: #9d9d9d;
`;
const StHeaderDdayProfile = styled.div`
  width: 234px;
  height: 75.39px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 48.39px;
  margin-right: 20px;
`;
const StHeaderDday = styled.div`
  width: 89px;
  height: 44px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: #00573f;
`;
const StHeaderProfile = styled.div`
  width: 46.67px;
  height: 46.67px;
  margin-left: 90px;
`;
const StHeaderProfileImg = styled.img`
  width: 48px;
  height: 48px;
  /* background: #9d9d9d; */
`;
const StContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - 254px);
  display: flex;
  /* border: 1px solid #8cacff; */
`;
const StContentLeft = styled.div`
  width: 332px;
  height: calc(100vh - 254px);
  /* border: 1px solid #8cacff; */
`;
const StContentMain = styled.div`
  width: calc(100% - 332px);
  height: calc(100vh - 254px);
  /* border: 1px solid #8cacff; */
`;
const StContentMainContainerT = styled.div`
  width: 100%;
  height: 345px;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTime = styled.div`
  box-sizing: border-box;
  width: 587px;
  height: 345px;
  background: #ffffff;
  border: 1px solid #bfbfbf;
  border-radius: 12px;
  margin-right: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StContentMainTotalTimeLayout = styled.div`
  width: 550px;
  height: 303px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeHead = styled.div`
  width: 550px;
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeTitel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180.19px;
  height: 27px;
`;
const StContentMainTotalTimeText = styled.div`
  width: 98px;
  height: 27px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
`;
const StContentMainTotalTimeText2 = styled.div`
  width: 62px;
  height: 19px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #848484;
`;
const StContentMainTotalTimeBody = styled.div`
  width: 550px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeView = styled.div`
  width: 360px;
  height: 210px;
  background: #eaeaea;
  border-radius: 14.266px;
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StContentMainTotalTimeViewT = styled.div`
  width: 129px;
  height: 44px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: #303031;
`;
const StContentMainTotalTimerLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 150px;
  height: 202.27px;
`;
const StContentMainTotalTimerTitle = styled.div`
  width: 150px;
  height: 20px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #747475;
`;
const StContentMainTotalTimer = styled.div`
  width: 150px;
  height: 35px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 35px;
  color: #303031;
  margin: 7px 0px 19px 0px;
`;
const StContentMainTodoList = styled.div`
  box-sizing: border-box;
  width: 395px;
  height: 345px;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StContentMainTodoListTitle = styled.div`
  width: 117px;
  height: 54px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #e8e8e8e8;
`;
const StContentMainContainerB = styled.div`
  width: 100%;
  height: 395px;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
const StContentMainStatistics = styled.div`
  box-sizing: border-box;
  width: 530px;
  height: 296px;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  margin: 13px 13px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StContentMainStatisticsTitleH = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 479.36px;
  height: 29.36px;
`;
const StContentMainStatisticsTitl = styled.div`
  width: 37px;
  height: 27px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #303031;
`;
const StContentMainStatisticsTitlBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 236.89px;
  height: 29.36px;
  background: #f4f4f4;
  border-radius: 3.34103px;
`;
const StContentMainStatisticsTitlBoxList = styled.div`
  width: 16px;
  height: 16px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #848484;
`;
const StContentMainStatisticsGraph = styled.div`
  width: 479.36px;
  height: 172.9px;
  margin: 20px 0px 14px 0px;
  /* background: #eaeaea; */
`;
const StContentMainStatisticsSub = styled.div`
  display: flex;
  align-items: flex-start;
  width: 164.55px;
  height: 16px;
`;
const StContentMainStatisticsSubT = styled.div`
  display: flex;
  align-items: flex-start;
  width: 164.55px;
  height: 16px;
  background: #f8f8f8;
`;
const StContentMainSubContainer = styled.div`
  width: 452px;
  height: 296px;
  display: flex;
  flex-direction: column;
  margin-top: 13px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelRank = styled.div`
  width: 452px;
  height: 123px;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitel = styled.div`
  box-sizing: border-box;
  width: 220px;
  height: 123px;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StContentMainMyTitel = styled.div`
  width: 37px;
  height: 16px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #848484;
  margin-left: 25px;
`;
const StContentMainTitelName = styled.div`
  width: 95px;
  height: 25px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #303031;
  margin: 7px 0px 7px 25px;
`;
const StContentMainTitelEx = styled.div`
  display: flex;
  align-items: baseline;
  width: 162px;
  height: 19px;
`;
const StContentMainTitelNextEx = styled.div`
  width: 81px;
  height: 19px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #848484;
  margin-left: 25px;
`;
const StContentMainTitelNextAro = styled.div`
  box-sizing: border-box;
  width: 10px;
  height: 0px;
  margin: 0px 8px 0px 9px;
  //div -> img 변경
`;
const StContentMainTitelNextTime = styled.div`
  width: 56px;
  height: 19px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #90b54c;
`;
const StContentMainRank = styled.div`
  box-sizing: border-box;
  width: 220px;
  height: 123px;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StContentMainRankTitle = styled.div`
  width: 59px;
  height: 16px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #848484;
  margin-left: 25px;
`;
const StContentMainRankName = styled.div`
  width: 118px;
  height: 25px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #303031;
  margin: 7px 0px 7px 25px;
`;
const StContentMainRankEx = styled.div`
  width: 81px;
  height: 19px;
  margin-left: 25px;
  display: flex;
  align-items: baseline;
`;
const StContentMainRankNextAro = styled.div`
  box-sizing: border-box;
  width: 10px;
  height: 0px;
  margin: 0px 8px 0px 0px;
  //div -> img 변경
`;
const StContentMainRankTime = styled.div`
  width: 56px;
  height: 19px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #90b54c;
`;
const StContentMainSubStudyRoom = styled.div`
  box-sizing: border-box;
  width: 452px;
  height: 160px;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  margin-top: 13px;
  display: flex;
  flex-direction: column;
`;
const StContentMainSubStudyRoomTitle = styled.div`
  width: 140px;
  height: 27px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
  margin: 19px 0px 12px 25px;
`;
const StContentMainSubStudyRoomList = styled.div`
  width: 401px;
  height: 54px;
  background: rgba(144, 181, 76, 0.2);
  border-radius: 12px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StContentMainSubStudyRoomName = styled.div`
  width: 108px;
  height: 19px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  margin: 0px 0px 0px 23.57px;
`;
const StContentMainSubStudyRoomBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 40px;
  background: #fefefefe;
  border: 1px solid #bfbfbfbf;
  border-radius: 30px;
  margin-right: 10px;
`;
