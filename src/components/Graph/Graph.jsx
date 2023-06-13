import React from 'react';
import { Line } from 'react-chartjs-2';
import { styled } from 'styled-components';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Graph = ({
  token,
  dailyStudyChart,
  monthlyStudyChart,
  weeklyStudyChart,
  selectedGraph,
}) => {
  // const data = token
  //   ? {
  //       labels: ['6/4', '6/5', '6/6', '6/7', '6/8', '6/9', '6/10'],
  //       datasets: [
  //         {
  //           label: '누적 공부시간',
  //           data: [12, 8, 15, 5, 10, 18, 0],
  //           // fill: false,
  //           borderColor: '#90B54C',
  //           tension: 0.4,
  //           pointStyle: 'circle', // 데이터 포인트를 원 모양으로 설정
  //           pointRadius: 4, // 데이터 포인트의 반지름 크기 설정
  //           pointBackgroundColor: '#90B54C', // 데이터 포인트의 배경색 설정
  //         },
  //       ],
  //     }
  //   : {
  //       labels: ['6/4', '6/5', '6/6', '6/7', '6/8', '6/9', '6/10'],
  //       datasets: [
  //         {
  //           label: '누적 공부시간',
  //           data: [0, 0, 0, 0, 0, 0, 0],
  //           // fill: false,
  //           borderColor: '#90B54C',
  //           tension: 0.4,
  //           pointStyle: 'circle', // 데이터 포인트를 원 모양으로 설정
  //           pointRadius: 4, // 데이터 포인트의 반지름 크기 설정
  //           pointBackgroundColor: '#90B54C', // 데이터 포인트의 배경색 설정
  //         },
  //       ],
  //     };

  // const options = {
  //   scales: {
  //     y: {
  //       type: 'linear', // 스케일 유형을 'linear'로 설정
  //       beginAtZero: true,
  //       min: 0, // y축 최소값을 0으로 설정
  //       max: 24, // y축 최대값을 24로 설정
  //       ticks: {
  //         stepSize: 5,
  //         callback: function (value) {
  //           return value + 'h';
  //         },
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       position: 'bottom', // 레이블을 아래로 설정
  //       // labels: {
  //       //   usePointStyle: true, // 라벨에 포인트 스타일 적용
  //       //   font: {
  //       //     size: 12, // 폰트 크기 설정
  //       //   },
  //       // },
  //     },
  //   },
  //   layout: {
  //     padding: {
  //       bottom: -10, // 그래프와 레이블 간의 간격을 조절
  //     },
  //   },
  // };

  const getChartData = () => {
    let labels = [];
    let studyTimes = [];

    let options = {
      scales: {
        y: {
          type: 'linear', // 스케일 유형을 'linear'로 설정
          beginAtZero: true,
          min: 0, // y축 최소값을 0으로 설정
          max: 24, // y축 최대값을 24로 설정
          ticks: {
            stepSize: 4,
            callback: function (value) {
              return value + 'h';
            },
          },
        },
      },
      plugins: {
        legend: {
          position: 'bottom', // 레이블을 아래로 설정
        },
      },
      layout: {
        padding: {
          bottom: -10, // 그래프와 레이블 간의 간격을 조절
        },
      },
    };

    if (selectedGraph === '1D') {
      labels = Object.keys(dailyStudyChart).map((key) => {
        const date = new Date(key);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}/${day}`;
      });
      studyTimes = Object.values(dailyStudyChart).map((value) => {
        const hours = Math.floor(value / 60); // 분을 시간으로 변환
        return `${hours}`;
      });
      options.scales.y.max = 24;
    } else if (selectedGraph === '1W') {
      labels = Object.keys(weeklyStudyChart).map((key) => `${key}`);
      studyTimes = Object.values(weeklyStudyChart).map((value) => {
        const hours = Math.floor(value / 60); // 분을 시간으로 변환
        return `${hours}`;
      });
      options.scales.y.max = 168;
    } else if (selectedGraph === '1M') {
      labels = Object.keys(monthlyStudyChart).map((key) => {
        const date = new Date(key);
        const year = date.getFullYear(); // 년도 추출
        const month = date.getMonth() + 1;
        return `${year}/${month}`; // 년/월 형식으로 변경
      });
      studyTimes = Object.values(monthlyStudyChart).map((value) => {
        const hours = Math.floor(value / 60); // 분을 시간으로 변환
        return `${hours}`;
      });
      options.scales.y.max = 720;
    }

    return {
      labels,
      datasets: [
        {
          label: '누적 공부시간',
          data: studyTimes,
          borderColor: '#90B54C',
          tension: 0.4,
          pointStyle: 'circle',
          pointRadius: 4,
          pointBackgroundColor: '#90B54C',
        },
      ],
      options,
    };
  };

  const data = token ? getChartData() : null;

  // const options = {
  //   scales: {
  //     y: {
  //       type: 'linear', // 스케일 유형을 'linear'로 설정
  //       beginAtZero: true,
  //       min: 0, // y축 최소값을 0으로 설정
  //       max: 24, // y축 최대값을 24로 설정
  //       ticks: {
  //         stepSize: 5,
  //         callback: function (value) {
  //           return value + 'h';
  //         },
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       position: 'bottom', // 레이블을 아래로 설정
  //     },
  //   },
  //   layout: {
  //     padding: {
  //       bottom: -10, // 그래프와 레이블 간의 간격을 조절
  //     },
  //   },
  // };

  return (
    <StGraphContainer>
      {/* <Line data={data} options={options} width={430} height={210} /> */}
      {data && <Line data={data} options={data.options} width={430} height={210} />}
    </StGraphContainer>
  );
};

export default Graph;

const StGraphContainer = styled.div`
  height: 210px;
  width: 430px;
  display: flex;
  justify-content: center;
`;
