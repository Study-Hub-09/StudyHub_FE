import React from 'react';
import kakaobtn from '../../assets/Icons/kakaobtn.svg';
import { StKakaoBtn } from '../../styles/Common.styles';

function KakaoButton({ to }) {
  return (
    <StKakaoBtn to={to}>
      <img src={kakaobtn} alt="Kakao Login Button" />
    </StKakaoBtn>
  );
}

export default KakaoButton;
