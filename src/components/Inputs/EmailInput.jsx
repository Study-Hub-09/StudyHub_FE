import React from 'react';
import Button from '../Buttons/Button';
import {
  StIcon,
  StInput,
  StInputBox,
  StInputDiv,
  StInputFrame,
  StMessage,
} from '../../styles/Inputs.styles';
import errorIcon from '../../assets/Icons/errorIcon.svg';
import checkIcon from '../../assets/Icons/checkIcon.svg';

function EmailInput({
  label,
  inputboxwidth,
  divwith,
  bordercolor,
  onFocus,
  onBlur,
  onClick,
  disabled,
  button,
  message,
  value,
  validEmail,
  validCode,
  emailVerification,
  successMessage,
  errorMessage,
  ...inputprops
}) {
  const getBordercolor = () => {
    if (value) {
      return validCode || validEmail || emailVerification ? 'green' : 'red';
    }
    return bordercolor;
  };

  return (
    <StInputBox inputboxwidth={inputboxwidth}>
      <label>{label}</label>
      <StInputFrame>
        <StInputDiv
          divwith={divwith}
          bordercolor={getBordercolor()}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <StInput type="text" value={value} {...inputprops} />
          <Button
            type="button"
            width="82px"
            height="36px"
            border="var(--color-gray)"
            padding="8px 27px"
            borderradius="47px"
            onClick={onClick}
          >
            {button}
          </Button>
        </StInputDiv>
        {value && (
          <StIcon>
            {validCode || validEmail || emailVerification ? (
              <img src={checkIcon} alt="Green Check Icon" />
            ) : (
              <img src={errorIcon} alt="Red Error Icon" />
            )}
          </StIcon>
        )}
      </StInputFrame>
      {value && (
        <StMessage>
          {validCode || validEmail || emailVerification ? successMessage : errorMessage}
        </StMessage>
      )}
    </StInputBox>
  );
}

export default EmailInput;
