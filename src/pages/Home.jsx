import React from 'react';
import Hero from '../components/Layouts/Hero';
import Section from '../components/Section/Section';
import section1_rooms from '../assets/Images/LandingPage/section1_rooms.png';
import section2_graph from '../assets/Images/LandingPage/section2_graph.png';
import section3_level from '../assets/Images/LandingPage/section3_level.png';
import { StSectionDescription } from '../styles/Layout.styles';

function Home() {
  return (
    <div>
      <Hero />
      <Section height="550px" backgroundcolor="var(--color-light-white)">
        <StSectionDescription width="340px">
          <h3>다양한 카테고리를 골라골라</h3>
          <h1>
            혼자하기 어렵다면 <br />
            함께하자
          </h1>
          <p>
            혼자하는 공부가 어렵고 지칠 때 목표가 같은 동료들과 <br />
            함께 공부하면 더 높은 성취를 이뤄낼 수 있을거에요
          </p>
        </StSectionDescription>
        <img src={section1_rooms} alt="" />
      </Section>
      <Section height="688px" backgroundcolor="var(--color-yellow)">
        <img src={section2_graph} alt="" />
        <StSectionDescription width="455px" textalign="right">
          <h3>한눈에 보이는 시간관리</h3>
          <h1>
            타이머로 한눈에 <br />
            하루 공부시간 알아보기
          </h1>
          <p>
            하루에 얼마나 목표달성을 위해 노력했는지, 얼마나 꾸준히 지켜나갔는지, <br />
            매일, 매 주, 매 달의 성취 시간을 분석해서 통계를 확인해줘요.
          </p>
        </StSectionDescription>
      </Section>
      <Section height="780px">
        <StSectionDescription width="446px">
          <h3>귀여운 칭호로 의욕UP!</h3>
          <h1>
            목표를 정하고 <br /> 한 발 나아간 나를 위한 지표
          </h1>
          <p>
            누적된 시간이 늘어날 수록 새로운 칭호를 얻을 수 있어요! <br /> 스스로의 칭호를
            위해 의욕적으로 나아가요.
          </p>
        </StSectionDescription>
        <img src={section3_level} alt="" />
      </Section>
    </div>
  );
}

export default Home;
