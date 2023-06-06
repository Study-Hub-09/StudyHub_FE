import React from 'react';
import { Line } from 'react-chartjs-2';
import { styled } from 'styled-components';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Graph = ({ token }) => {
  const data = token
    ? {
        labels: ['6/4', '6/5', '6/6', '6/7', '6/8', '6/9', '6/10'],
        datasets: [
          {
            label: '누적 공부시간',
            data: [12, 8, 15, 5, 10, 18, 0],
            // fill: false,
            borderColor: '#90B54C',
            tension: 0.4,
            pointStyle: 'circle', // 데이터 포인트를 원 모양으로 설정
            pointRadius: 4, // 데이터 포인트의 반지름 크기 설정
            pointBackgroundColor: '#90B54C', // 데이터 포인트의 배경색 설정
          },
        ],
      }
    : {
        labels: ['6/4', '6/5', '6/6', '6/7', '6/8', '6/9', '6/10'],
        datasets: [
          {
            label: '누적 공부시간',
            data: [0, 0, 0, 0, 0, 0, 0],
            // fill: false,
            borderColor: '#90B54C',
            tension: 0.4,
            pointStyle: 'circle', // 데이터 포인트를 원 모양으로 설정
            pointRadius: 4, // 데이터 포인트의 반지름 크기 설정
            pointBackgroundColor: '#90B54C', // 데이터 포인트의 배경색 설정
          },
        ],
      };

  const options = {
    scales: {
      y: {
        type: 'linear', // 스케일 유형을 'linear'로 설정
        beginAtZero: true,
        min: 0, // y축 최소값을 0으로 설정
        max: 24, // y축 최대값을 24로 설정
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return value + 'h';
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom', // 레이블을 아래로 설정
        // labels: {
        //   usePointStyle: true, // 라벨에 포인트 스타일 적용
        //   font: {
        //     size: 12, // 폰트 크기 설정
        //   },
        // },
      },
    },
    layout: {
      padding: {
        bottom: -10, // 그래프와 레이블 간의 간격을 조절
      },
    },
  };

  return (
    <StGraphContainer>
      <Line data={data} options={options} />
    </StGraphContainer>
  );
};

export default Graph;

const StGraphContainer = styled.div`
  height: 120%;
  width: 100%;
  display: flex;
  justify-content: center;
`;
