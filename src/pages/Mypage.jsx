import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCookie } from '../Cookies/Cookies';
import profileLogo from '../../src/assets/Images/Frame 19.svg';
import Graph from '../components/Graph/Graph';
import { instance } from '../core/api/axios/instance';
import { useQuery } from 'react-query';
import { getRoom } from '../api/api';
import { useNavigate } from 'react-router-dom';
import ModalDday from '../components/Modal/ModalDday';
import RoomPagination from '../components/Mypage/RoomPagination';
import JoinStudyRoom from '../components/Mypage/JoinStudyRoom';
import Rank from '../components/Mypage/Rank';
import StudyTitle from '../components/Mypage/StudyTitle';

function Mypage({ onClose }) {
  const nickname = localStorage.member;
  const [token, setToken] = useState('');
  const [ddayList, setDdayList] = useState([]);
  const [showChild, setShowChild] = useState(false);

  const [dailyStudyTime, setDailyStudyTime] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [dailyStudyChart, setDailyStudyChart] = useState([]);
  const [weeklyStudyChart, setWeeklyStudyChart] = useState([]);
  const [monthlyStudyChart, setMonthlyStudyChart] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState('1D');

  const [topRankedNickname, setTopRankedNickname] = useState('');
  const [topRankedTotalStudyTime, setTopRankedTotalStudyTime] = useState(0);
  const [nextGradeRemainingTime, setNextGradeRemainingTime] = useState(0);
  const [title, setTitle] = useState('');
  const [isModalDdayOpen, setIsModalDdayOpen] = useState(false);
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
        myRooms,
        topRankedNickname,
        topRankedTotalStudyTime,
        nextGradeRemainingTime,
        title,
      } = response.data.data;

      setDailyStudyChart(dailyStudyChart);
      setDailyStudyTime(dailyStudyTime);
      setMonthlyStudyChart(monthlyStudyChart);
      setTotalStudyTime(totalStudyTime);
      setWeeklyStudyChart(weeklyStudyChart);
      setMyRooms(myRooms);
      setTopRankedNickname(topRankedNickname);
      setTopRankedTotalStudyTime(topRankedTotalStudyTime);
      setNextGradeRemainingTime(nextGradeRemainingTime);
      setTitle(title);
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

  // 총 공부한시간(1등)
  const totalRankTime = (topRankedTotalStudyTime) => {
    const hours = Math.floor(topRankedTotalStudyTime / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((topRankedTotalStudyTime % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (topRankedTotalStudyTime % 60).toString().padStart(2, '0');
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

  // modal을 이용한 방입장 및 취소
  const openModalDday = () => {
    setIsModalDdayOpen(true);
  };

  const closeModalDday = () => {
    setIsModalDdayOpen(false);
  };

  // const handleDdayChange = (ddayValue) => {
  //   setDday(ddayValue);
  // };

  const handleClick = () => {
    setShowChild(true);
  };

  const handleDdayListChange = (list) => {
    setDdayList(list);
  };

  return (
    <>
      <div>
        {isModalDdayOpen && (
          <ModalDday onClose={closeModalDday} onDdayChange={handleDdayListChange} />
        )}
      </div>
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
                <StHeaderDdayCon>
                  <StHeaderDday>{token ? 'D-100' : 'D-00'}</StHeaderDday>
                  <StHeaderDdayOp onClick={openModalDday}>설정</StHeaderDdayOp>
                  {/* <StHeaderDdayOp onClick={handleClick}>설정</StHeaderDdayOp>
                  {showChild && <DdayList />} */}
                </StHeaderDdayCon>

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
                      <StContentMainTotalTimerTitle>
                        {result}
                      </StContentMainTotalTimerTitle>
                    </StContentMainTotalTimerLayout>
                  </StContentMainTotalTimeBody>
                </StContentMainTotalTimeLayout>
              </StContentMainTotalTime>

              <JoinStudyRoom />
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
                    nextRankTime={nextRankTime}
                    nextGradeRemainingTime={nextGradeRemainingTime}
                    title={title}
                  />

                  <Rank
                    totalRankTime={totalRankTime}
                    topRankedNickname={topRankedNickname}
                    topRankedTotalStudyTime={topRankedTotalStudyTime}
                  />
                </StContentMainTitelRank>

                <RoomPagination />
              </StContentMainSubContainer>
            </StContentMainContainerB>
          </StContentMain>
        </StContentContainer>
      </StMainContainer>
    </>
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
  height: 20%;
  display: flex;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderLeft = styled.div`
  width: 10%;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderMain = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderMainContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderUserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 25%;
  height: 38%;
  margin-bottom: 4.1%;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderUserName = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 44px;
  color: #000000;
  margin: 0px 0px 9.39px 0px;
`;
const StHeaderUserIntro = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 120%;
  color: #9d9d9d;
`;
const StHeaderDdayProfile = styled.div`
  width: 30%;
  height: 38%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 48.39px;
  margin-right: 20px;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderDdayCon = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderDday = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 44px;
  color: #00573f;
  /* border: 1px solid #ff8d8d; */
`;
const StHeaderDdayOp = styled.div`
  width: 50%;
  height: 50%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 19px;
  text-decoration-line: underline;
  color: #848484;
  margin: 0px 0px 10px 13px;
  cursor: pointer;
`;
const StHeaderProfile = styled.div`
  width: 30%;
  height: 60%;
  margin-left: 50px;
`;
const StHeaderProfileImg = styled.img`
  width: 100%;
  height: 100%;
  /* background: #9d9d9d; */
`;
const StContentContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
const StContentLeft = styled.div`
  width: 10%;
  /* border: 1px solid #8cacff; */
`;
const StContentMain = styled.div`
  width: 80%;
  margin-left: 8%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainContainerT = styled.div`
  width: 80%;
  height: 45%;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTime = styled.div`
  box-sizing: border-box;
  width: 60%;
  background: #ffffff;
  border: 1px solid #bfbfbf;
  border-radius: 12px;
  margin-right: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeLayout = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeHead = styled.div`
  width: 90%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeTitel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 70%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeText = styled.div`
  width: 50%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 27px;
  color: #000000;
  margin-right: 7%;
`;
const StContentMainTotalTimeText2 = styled.div`
  width: 40%;
  height: 80%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 19px;
  color: #848484;
`;
const StContentMainTotalTimeBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeView = styled.div`
  width: 100%;
  height: 80%;
  background: #d9efe9;
  border-radius: 14.266px;
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimeViewT = styled.div`
  width: 42%;
  height: 23%;
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 44px;
  color: #303031;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimerLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  height: 82%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimerTitle = styled.div`
  width: 100%;
  height: 9%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.938rem;
  line-height: 20px;
  color: #747475;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTotalTimer = styled.div`
  width: 100%;
  height: 18%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 35px;
  color: #303031;
  margin: 7px 0px 17px 0px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainContainerB = styled.div`
  width: 80%;
  height: 45%;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
const StContentMainStatistics = styled.div`
  box-sizing: border-box;
  width: 50%;
  height: 90%;
  background: #ffffff;
  border: 1px solid #bfbfbfbf;
  border-radius: 12px;
  margin: 1% 1% 0% 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;
const StContentMainStatisticsTitleH = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 10%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainStatisticsTitl = styled.div`
  width: 9%;
  height: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 27px;
  color: #303031;
  margin-right: 45px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainStatisticsTitlBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 53%;
  height: 100%;
  background: #f4f4f4;
  border-radius: 3.34103px;
  margin-right: 8px;
  /* border: 1px solid #8cacff; */
`;
const StContentMainStatisticsTitlBoxList = styled.div`
  width: 6%;
  height: 50%;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #848484;
  cursor: pointer;
  &:hover {
    width: 20%;
    height: 50%;
    padding: 0px 0px 0px 18px;
    margin: 0px -15px 0px -18px;
    background: #ffffff;
  }
`;
const StContentMainStatisticsTitlBoxList2 = styled.div`
  width: 6%;
  height: 50%;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #848484;
  cursor: pointer;
  &:hover {
    width: 20%;
    height: 50%;
    padding: 0px 0px 0px 16px;
    margin: 0px -20px 0px -18px;
    background: #ffffff;
  }
`;
const StContentMainStatisticsTitlBoxList3 = styled.div`
  width: 6%;
  height: 50%;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #848484;
  cursor: pointer;
  &:hover {
    width: 20%;
    height: 50%;
    padding: 0px 0px 0px 16px;
    margin: 0px -18px 0px -15px;
    background: #ffffff;
  }
`;
const StContentMainStatisticsGraph = styled.div`
  width: 100%;
  height: 63%;
  margin: 20px 0px 14px 0px;
  display: flex;
  justify-content: center;
  /* background: #eaeaea; */
  /* border: 1px solid #8cacff; */
`;
const StContentMainStatisticsSub = styled.div`
  display: flex;
  align-items: flex-start;
  width: 164.55px;
  height: 16px;
  /* border: 1px solid #8cacff; */
`;
// const StContentMainStatisticsSubT = styled.div`
//   display: flex;
//   align-items: flex-start;
//   width: 164.55px;
//   height: 16px;
//   background: #f8f8f8;
// `;
const StContentMainSubContainer = styled.div`
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  /* border: 1px solid #8cacff; */
`;
const StContentMainTitelRank = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  /* border: 1px solid #8cacff; */
`;
