import React from 'react';
import { StButton } from '../../styles/Common.styles';

function Button({
  children,
  border,
  width,
  height,
  padding,
  borderradius,
  disabled,
  onClick,
}) {
  return (
    <StButton
      border={border}
      width={width}
      height={height}
      padding={padding}
      borderradius={borderradius}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StButton>
  );
}

export default Button;
