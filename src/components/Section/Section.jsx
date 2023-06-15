import React from 'react';
import { StHomeLayoutContainer } from '../../styles/Layout.styles';
import { StSection } from '../../styles/Common.styles';

function Section({ children, height, backgroundcolor }) {
  return (
    <StHomeLayoutContainer height={height} backgroundcolor={backgroundcolor}>
      <StSection>{children}</StSection>
    </StHomeLayoutContainer>
  );
}

export default Section;
