import React from 'react';
import { StButton } from '../../styles/Common.styles';

function Button({
  children,
  border,
  width,
  color,
  height,
  padding,
  borderradius,
  disabled,
  onClick,
  backgroundcolor,
  hover,
}) {
  return (
    <StButton
      border={border}
      color={color}
      backgroundcolor={backgroundcolor}
      width={width}
      height={height}
      padding={padding}
      hover={hover}
      borderradius={borderradius}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StButton>
  );
}

export default Button;
