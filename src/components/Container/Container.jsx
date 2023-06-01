import React from 'react';
import { StContainer } from '../../styles/Common.styles';

function Container({
  children,
  display,
  justifycontent,
  flexdirection,
  alignitems,
  gap,
}) {
  return (
    <StContainer
      display={display}
      justifycontent={justifycontent}
      flexdirection={flexdirection}
      alignitems={alignitems}
      gap={gap}
    >
      {children}
    </StContainer>
  );
}

export default Container;
