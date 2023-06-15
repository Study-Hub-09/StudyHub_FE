import React from 'react';
import herologo from '../../assets/Icons/herologo.svg';
import herobiglogo from '../../assets/Icons/herobiglogo.svg';
import {
  StHeroContent,
  StHeroLayoutContainer,
  StHomeLayoutBox,
  StHeroDescription,
  StHeroDescriptionLogo,
} from '../../styles/Layout.styles';
import Button from '../Buttons/Button';
import { getCookie } from '../../Cookies/Cookies';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const token = getCookie('AccessToken');
  const navigate = useNavigate();

  const addRoomHandler = () => {
    if (token) {
      navigate('/main');
    } else {
      alert('로그인 후 이용 가능한 페이지입니다.');
      navigate('/members/login');
    }
  };

  return (
    <StHeroLayoutContainer>
      <StHomeLayoutBox>
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
              ‘스터브(STURB)’는 ‘study’와 ‘hub’의 합성어로 공부의 중심지를 의미합니다.
              혼자서는 공부에 집중하기 어렵다면 목표가 같은 동료들과 함께 성장해요!
            </p>
            <Button
              width="150px"
              padding="12px 24px"
              borderradius="50px"
              hover="none"
              color="var(--color-white)"
              backgroundcolor="var(--color-dark-green)"
              onClick={addRoomHandler}
            >
              스터디 만들기
            </Button>
          </StHeroDescription>
        </StHeroContent>
      </StHomeLayoutBox>
    </StHeroLayoutContainer>
  );
}

export default Hero;
