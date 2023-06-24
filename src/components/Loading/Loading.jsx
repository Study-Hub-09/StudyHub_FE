import React from 'react';
import {
  StRedirectContainer,
  StRedirectBox,
  StRedirectHeader,
  StRedirectContent,
} from '../../styles/Common.styles';
import Typed from 'react-typed';

function Loading() {
  return (
    <StRedirectContainer>
      <StRedirectBox>
        <StRedirectHeader>
          <h1>
            <Typed strings={['loading']} typeSpeed={120} backSpeed={150} loop />
          </h1>
        </StRedirectHeader>
        <StRedirectContent>
          <p width="506px">Strive for progress, not perfection</p>
          <p width="387px">redirecting to study hub...</p>
        </StRedirectContent>
      </StRedirectBox>
    </StRedirectContainer>
  );
}

export default Loading;
