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
  validEmailCode,
  isEmailCodeVerified,
  isEmailVerified,
  successMessage,
  errorMessage,
  ...inputprops
}) {
  const isButtonDisabled = isEmailVerified || isEmailCodeVerified;

  const getBordercolor = () => {
    if (value) {
      return validEmailCode || validEmail || isEmailVerified ? 'green' : 'red';
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
            disabled={isButtonDisabled}
          >
            {button}
          </Button>
        </StInputDiv>
        {value && (
          <StIcon>
            {(validEmail && isEmailVerified && (
              <img src={checkIcon} alt="Green Check Icon" />
            )) ||
              (validEmailCode && <img src={checkIcon} alt="Green Check Icon" />) ||
              (!validEmail && !isEmailVerified && (
                <img src={errorIcon} alt="Red Error Icon" />
              ))}
          </StIcon>
        )}
      </StInputFrame>
      {value && (
        <StMessage>
          {validEmailCode || validEmail || isEmailVerified
            ? successMessage
            : errorMessage}
        </StMessage>
      )}
    </StInputBox>
  );
}

export default EmailInput;
