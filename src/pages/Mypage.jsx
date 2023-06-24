import React, { useEffect, useState } from 'react';
import { getCookie } from '../Cookies/Cookies';
import Graph from '../components/Graph/Graph';
import { useNavigate } from 'react-router-dom';
import RoomPagination from '../components/Mypage/RoomPagination';
import JoinStudyRoom from '../components/Mypage/JoinStudyRoom';
import Rank from '../components/Mypage/Rank';
import StudyTitle from '../components/Mypage/StudyTitle';
import { getMypage } from '../core/api/auth/mypage';
import { useQuery } from 'react-query';
import {
  StMainContainer,
  StHeaderContainer,
  StHeaderLeft,
  StHeaderMain,
  StHeaderMainContainer,
  StHeaderUserNameContainer,
  StContentContainer,
  StContentLeft,
  StContentMain,
  StContentMainContainerT,
  StContentMainTotalTime,
  StContentMainTotalTimeLayout,
  StContentMainTotalTimeHead,
  StContentMainTotalTimeTitel,
  StContentMainTotalTimeText,
  StContentMainTotalTimeText2,
  StContentMainTotalTimeBody,
  StContentMainTotalTimeView,
  StContentMainTotalTimeViewT,
  StContentMainTotalTimerLayout,
  StContentMainTotalTimerTitle,
  StContentMainTotalTimer,
  StContentMainContainerB,
  StContentMainStatistics,
  StContentMainStatisticsTitleH,
  StContentMainStatisticsTitl,
  StContentMainStatisticsTitlBox,
  StContentMainStatisticsTitlBoxList,
  StContentMainStatisticsTitlBoxList2,
  StContentMainStatisticsTitlBoxList3,
  StContentMainStatisticsGraph,
  StContentMainSubContainer,
  StContentMainTitelRank,
  StHeaderUserName,
  StHeaderUserIntro,
} from '../styles/mypage/Mypage.styles';

function Mypage({ onClose }) {
  const nickname = localStorage.member;
  const [token, setToken] = useState('');

  const [dailyStudyTime, setDailyStudyTime] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [dailyStudyChart, setDailyStudyChart] = useState([]);
  const [weeklyStudyChart, setWeeklyStudyChart] = useState([]);
  const [monthlyStudyChart, setMonthlyStudyChart] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState('1D');

  const [topRankedList, setTopRankedList] = useState('');
  const [nextGradeRemainingTime, setNextGradeRemainingTime] = useState(0);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery('mypage', () => getMypage(), {
    onSuccess: (response) => {
      // console.log(response);
      setDailyStudyChart(response.data.dailyStudyChart);
      setDailyStudyTime(response.data.dailyStudyTime);
      setMonthlyStudyChart(response.data.monthlyStudyChart);
      setTotalStudyTime(response.data.totalStudyTime);
      setWeeklyStudyChart(response.data.weeklyStudyChart);
      setMyRooms(response.data.myRooms);
      setTopRankedList(response.data.topRankedList);
      setNextGradeRemainingTime(response.data.nextGradeRemainingTime);
      setTitle(response.data.title);
    },
    onError: (error) => {
      // console.log('error', error.msg);
    },
    enabled: !!token,
  });

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    setToken(accessToken);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
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

  // 다음 등급까지 남은 공부시간
  const nextRankTime = (nextGradeRemainingTime) => {
    const hours = Math.floor(nextGradeRemainingTime / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((nextGradeRemainingTime % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (nextGradeRemainingTime % 60).toString().padStart(2, '0');
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

  return (
    <>
      <StMainContainer>
        <StHeaderContainer>
          <StHeaderLeft></StHeaderLeft>

          <StHeaderMain>
            <StHeaderMainContainer>
              <StHeaderUserNameContainer>
                <StHeaderUserName>Hello, {token ? nickname : 'Guest!'}!</StHeaderUserName>
                <StHeaderUserIntro>나의 모든 공부 데이터 모아보기</StHeaderUserIntro>
              </StHeaderUserNameContainer>

              {/* <StHeaderDdayProfile>
                <StHeaderDdayCon>
                  <StHeaderDday>{'D-day'}</StHeaderDday>
                  <StHeaderDdayOp onClick={showAlert}>설정</StHeaderDdayOp>
                  <StHeaderDdayOp onClick={openModalDday}>설정</StHeaderDdayOp>
                  <StHeaderDdayOp onClick={handleClick}>설정</StHeaderDdayOp>
                  {showChild && <DdayList />}
                </StHeaderDdayCon>

                <StHeaderProfile>
                  <StHeaderProfileImg src={profileLogo} alt="profileLogo" />
                </StHeaderProfile>
              </StHeaderDdayProfile> */}
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
                      <StContentMainTotalTimerTitle>
                        {result}
                      </StContentMainTotalTimerTitle>
                    </StContentMainTotalTimerLayout>
                  </StContentMainTotalTimeBody>
                </StContentMainTotalTimeLayout>
              </StContentMainTotalTime>

              <JoinStudyRoom token={token} />
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

                {/* <StContentMainStatisticsSub>
                  <StContentMainStatisticsSubT></StContentMainStatisticsSubT>
                </StContentMainStatisticsSub> */}
              </StContentMainStatistics>

              <StContentMainSubContainer>
                <StContentMainTitelRank>
                  <StudyTitle
                    token={token}
                    nextRankTime={nextRankTime}
                    nextGradeRemainingTime={nextGradeRemainingTime}
                    title={title}
                  />

                  <Rank token={token} topRankedList={topRankedList} />
                </StContentMainTitelRank>

                <RoomPagination token={token} />
              </StContentMainSubContainer>
            </StContentMainContainerB>
          </StContentMain>
        </StContentContainer>
      </StMainContainer>
    </>
  );
}

export default Mypage;
