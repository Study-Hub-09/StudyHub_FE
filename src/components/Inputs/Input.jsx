import React, { useEffect, useRef } from 'react';
import { StInput, StInputBox, StInputDiv } from '../../styles/Inputs.styles';

function Input({
  label,
  type,
  placeholder,
  name,
  onChange,
  value,
  onFocus,
  onBlur,
  border,
  emailBorder,
  passwordBorder,
}) {
  const emailRef = useRef();

  const inputBorder = border(emailBorder || passwordBorder);

  useEffect(() => {
    if (name === 'email') {
      emailRef.current.focus();
    }
  }, [name]);

  return (
    <StInputBox inputboxwidth="366px" inputboxheight="77px">
      <label>{label}</label>
      <StInputDiv
        divwith="366px"
        bordercolor={inputBorder}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <StInput
          type={type}
          ref={emailRef}
          inputwidth="326px"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </StInputDiv>
    </StInputBox>
  );
}

export default Input;
