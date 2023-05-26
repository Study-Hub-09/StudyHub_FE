import React from 'react';
import kakaobtn from '../../assets/Images/KakaoButton/kakao_login_large_narrow.png';
import { StKakaoBtn } from '../../styles/Common.styles';

function KakaoButton() {
  return (
    <StKakaoBtn>
      <img src={kakaobtn} alt="Kakao Login Button" />
    </StKakaoBtn>
  );
}

export default KakaoButton;
