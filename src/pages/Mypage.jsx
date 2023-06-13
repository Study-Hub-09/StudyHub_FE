import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCookie } from '../Cookies/Cookies';
import profileLogo from '../../src/assets/Images/Frame 20.svg';
import sprout from '../../src/assets/Images/sprout.svg';
import Crown from '../../src/assets/Images/👑.svg';
import Arrow from '../../src/assets/Images/Arrow 1.svg';
import Graph from '../components/Graph/Graph';
import { instance } from '../core/api/axios/instance';
import { useQuery } from 'react-query';
import { getRoom } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Joinmodal from '../components/Joinmodal';
import ModalPortal from '../components/Modal/ModalPortal';
import Pagination from '../components/Pagination/Pagination';

function Mypage({ onClose }) {
  const nickname = localStorage.member;
  const [token, setToken] = useState('');

  const [dailyStudyTime, setDailyStudyTime] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [dailyStudyChart, setDailyStudyChart] = useState([]);
  const [weeklyStudyChart, setWeeklyStudyChart] = useState([]);
  const [monthlyStudyChart, setMonthlyStudyChart] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState('1D');

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery(['rooms', page], () => getRoom(page));

  const roomInfo = data?.data.content;

  const userInfo = async () => {
    try {
      const response = await instance.get(`/api/members/mypage`);
      console.log('#######response', response.data.data);

      const {
        dailyStudyChart,
        dailyStudyTime,
        monthlyStudyChart,
        totalStudyTime,
        weeklyStudyChart,
      } = response.data.data;

      setDailyStudyChart(dailyStudyChart);
      setDailyStudyTime(dailyStudyTime);
      setMonthlyStudyChart(monthlyStudyChart);
      setTotalStudyTime(totalStudyTime);
      setWeeklyStudyChart(weeklyStudyChart);
      return response.data.data;
    } catch (error) {
      console.error('????error:', error);
    }
  };

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    setToken(accessToken);
    userInfo();
  }, []);

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  // 오늘날짜 00.00.(요일) 형식
  const currentDate = today();
  function today() {
    const now = new Date();
    const options = { weekday: 'short', month: '2-digit', day: '2-digit' };
    const formattedDate = now.toLocaleDateString('ko-KR', options);

    return formattedDate;
  }

  // 오늘 공부한 시간
  const dailyTime = (dailyStudyTime) => {
    const hours = Math.floor(dailyStudyTime / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((dailyStudyTime % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (dailyStudyTime % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // 한 주 총 공부한 시간
  const weeklyentries = Object.entries(dailyStudyChart);
  weeklyentries.forEach(([key, value]) => {
    // console.log(key, value); // 각 키와 값 출력
  });

  let weeklysum = 0;
  for (const key in dailyStudyChart) {
    weeklysum += dailyStudyChart[key];
  }

  const weeklyTime = (weeklysum) => {
    const hours = Math.floor(weeklysum / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((weeklysum % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (weeklysum % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // 총 공부한 시간
  const totalTime = (totalStudyTime) => {
    const hours = Math.floor(totalStudyTime / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalStudyTime % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalStudyTime % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // 공부시간 비교
  const compareRecentAndPreviousValues = () => {
    if (Object.keys(weeklyStudyChart).length >= 2) {
      const keys = Object.keys(weeklyStudyChart);
      const recentObject = weeklyStudyChart[keys[keys.length - 1]];
      const previousObject = weeklyStudyChart[keys[keys.length - 2]];
      // recentObject와 previousObject의 값을 비교하고 원하는 작업 수행
      // 예: 특정 속성 값을 비교하기
      if (recentObject > previousObject) {
        // 최근 값이 이전 값보다 큰 경우에 대한 작업 수행
        return (
          <div>
            지난주 공부시간보다 <br /> 늘었습니다.
          </div>
        );
      } else if (recentObject < previousObject) {
        // 최근 값이 이전 값보다 작은 경우에 대한 작업 수행
        return (
          <div>
            지난주 공부시간보다 <br /> 줄었습니다.
          </div>
        );
      } else {
        // 최근 값과 이전 값이 같은 경우에 대한 작업 수행
        return (
          <div>
            지난주 공부시간과 <br /> 같습니다.
          </div>
        );
      }
    }
  };
  const result = compareRecentAndPreviousValues();

  // 공부시간별 그래프
  const handlePeriodChange = (period) => {
    setSelectedGraph(period);
  };

  // modal을 이용한 방입장 및 취소
  const openJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  // 페이지네이션
  const nextpageHandler = () => {
    setPage(page + 1);
  };
  const prevpageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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

                    <StContentMainTotalTimeText2>
                      {currentDate}
                    </StContentMainTotalTimeText2>
                  </StContentMainTotalTimeTitel>
                </StContentMainTotalTimeHead>

                <StContentMainTotalTimeBody>
                  <StContentMainTotalTimeView>
                    <StContentMainTotalTimeViewT>
                      {dailyTime(dailyStudyTime)}
                    </StContentMainTotalTimeViewT>
                  </StContentMainTotalTimeView>

                  <StContentMainTotalTimerLayout>
                    <StContentMainTotalTimerTitle>
                      총 공부 시간
                    </StContentMainTotalTimerTitle>
                    <StContentMainTotalTimer>
                      {totalTime(totalStudyTime)}
                    </StContentMainTotalTimer>

                    <StContentMainTotalTimerTitle>
                      이번주 공부 시간
                    </StContentMainTotalTimerTitle>
                    <StContentMainTotalTimer>
                      {weeklyTime(weeklysum)}
                    </StContentMainTotalTimer>
                    <StContentMainTotalTimerTitle>{result}</StContentMainTotalTimerTitle>
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
                  <StContentMainStatisticsTitlBoxList
                    onClick={() => handlePeriodChange('1D')}
                  >
                    1D
                  </StContentMainStatisticsTitlBoxList>
                  <StContentMainStatisticsTitlBoxList2
                    onClick={() => handlePeriodChange('1W')}
                  >
                    1W
                  </StContentMainStatisticsTitlBoxList2>
                  <StContentMainStatisticsTitlBoxList3
                    onClick={() => handlePeriodChange('1M')}
                  >
                    1M
                  </StContentMainStatisticsTitlBoxList3>
                </StContentMainStatisticsTitlBox>
              </StContentMainStatisticsTitleH>

              <StContentMainStatisticsGraph>
                <Graph
                  token={token}
                  dailyStudyChart={dailyStudyChart}
                  monthlyStudyChart={monthlyStudyChart}
                  weeklyStudyChart={weeklyStudyChart}
                  selectedGraph={selectedGraph}
                />
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
                <StContentMainSubStudyRoomTM>
                  <StContentMainSubStudyRoomTitle>
                    모집 중인 스터디
                  </StContentMainSubStudyRoomTitle>
                  <StContentMainSubStudyRoomMore
                    onClick={() => {
                      navigate('/main');
                    }}
                  >
                    더보기
                  </StContentMainSubStudyRoomMore>
                </StContentMainSubStudyRoomTM>
                {roomInfo
                  .sort((a, b) => b.updatedAt - a.updatedAt)
                  .map((item, index) => {
                    if (index === 0) {
                      return (
                        <StContentMainSubStudyRoomList>
                          <StContentMainSubStudyRoomName>
                            {item.roomName}
                          </StContentMainSubStudyRoomName>
                          <StContentMainSubStudyRoomBtn onClick={openJoinModal}>
                            입장하기
                          </StContentMainSubStudyRoomBtn>
                          {isJoinModalOpen && (
                            <ModalPortal>
                              <Joinmodal roomData={item} onClose={closeJoinModal} />
                            </ModalPortal>
                          )}
                        </StContentMainSubStudyRoomList>
                      );
                    }
                    return null;
                  })}
                <Pagination
                  prevpageHandler={prevpageHandler}
                  nextpageHandler={nextpageHandler}
                />
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
  width: 76px;
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
  justify-content: space-around;
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
  margin-right: 45px;
`;
const StContentMainStatisticsTitlBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 236.89px;
  height: 29.36px;
  background: #f4f4f4;
  border-radius: 3.34103px;
  margin-right: 8px;
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
  cursor: pointer;
  &:hover {
    width: 50px;
    height: 16px;
    padding: 0px 0px 0px 18px;
    margin: 0px -15px 0px -18px;
    background: #ffffff;
  }
`;
const StContentMainStatisticsTitlBoxList2 = styled.div`
  width: 16px;
  height: 16px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #848484;
  cursor: pointer;
  &:hover {
    width: 50px;
    height: 16px;
    padding: 0px 0px 0px 16px;
    margin: 0px -20px 0px -18px;
    background: #ffffff;
  }
`;
const StContentMainStatisticsTitlBoxList3 = styled.div`
  width: 16px;
  height: 16px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #848484;
  cursor: pointer;
  &:hover {
    width: 50px;
    height: 16px;
    padding: 0px 0px 0px 16px;
    margin: 0px -18px 0px -15px;
    background: #ffffff;
  }
`;
const StContentMainStatisticsGraph = styled.div`
  width: 479.36px;
  height: 172.9px;
  margin: 20px 0px 14px 0px;
  display: flex;
  justify-content: center;
  /* background: #eaeaea; */
`;
const StContentMainStatisticsSub = styled.div`
  display: flex;
  align-items: flex-start;
  width: 164.55px;
  height: 16px;
`;
// const StContentMainStatisticsSubT = styled.div`
//   display: flex;
//   align-items: flex-start;
//   width: 164.55px;
//   height: 16px;
//   background: #f8f8f8;
// `;
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
const StContentMainSubStudyRoomTM = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
const StContentMainSubStudyRoomMore = styled.div`
  width: 39px;
  height: 19px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #848484;
  text-decoration-line: underline;
  margin: 19px 26px 12px 0px;
  cursor: pointer;
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
