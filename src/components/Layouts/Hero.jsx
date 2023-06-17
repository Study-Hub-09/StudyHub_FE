import React from 'react';
import herologo from '../../assets/Icons/herologo.svg';
import herobiglogo from '../../assets/Icons/herobiglogo.svg';
import {
  StHeroContent,
  StHeroLayoutContainer,
  StHeroDescription,
  StHeroDescriptionLogo,
  StHeroLayoutBox,
} from '../../styles/Layout.styles';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <StHeroLayoutContainer>
      <StHeroLayoutBox>
        <StHeroContent>
          <div>
            <img src={herologo} alt="Study Hub Plant Logo" />
          </div>
          <StHeroDescription>
            <h2>
              혼자하는 공부가 어렵다면? <br />
              함공하자!
            </h2>
            <StHeroDescriptionLogo>
              <img src={herobiglogo} alt="스터브 Study Hub Big Logo" />
            </StHeroDescriptionLogo>
            <p>
              ‘스터브(STUB)’는 ‘study’와 ‘hub’의 합성어로 공부의 중심지를 의미합니다.
              혼자서는 공부에 집중하기 어렵다면 목표가 같은 동료들과 함께 성장해요!
            </p>
            <Button
              width="150px"
              padding="12px 24px"
              borderradius="50px"
              hover="none"
              color="var(--color-white)"
              backgroundcolor="var(--color-dark-green)"
              onClick={() => navigate('/main')}
            >
              스터디 둘러보기
            </Button>
          </StHeroDescription>
        </StHeroContent>
      </StHeroLayoutBox>
    </StHeroLayoutContainer>
  );
}

export default Hero;
