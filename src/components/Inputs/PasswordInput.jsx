import React, { useState } from 'react';
import {
  StInputBox,
  StInputFrame,
  StInputDiv,
  StInput,
  StIcon,
  StMessage,
  StLabel,
} from '../../styles/Inputs.styles';
import errorIcon from '../../assets/Icons/errorIcon.svg';
import checkIcon from '../../assets/Icons/checkIcon.svg';
import eye from '../../assets/Icons/eye.svg';

function PasswordInput({
  inputboxwidth,
  inputboxheight,
  label,
  onChange,
  onFocus,
  onBlur,
  bordercolor,
  divwith,
  messagewidth,
  messageheight,
  successmsg,
  errorMessage,
  value,
  validPwd,
  matchPwd,
  cursor,
  icon,
  ...inputprops
}) {
  const [showPwd, setshowPwd] = useState(false);

  const toggleShowPwd = () => {
    setshowPwd(!showPwd);
  };

  const getBordercolor = () => {
    if (value) {
      return validPwd || matchPwd ? 'green' : 'red';
    }
    return bordercolor;
  };

  return (
    <StInputBox inputboxwidth={inputboxwidth} inputboxheight={inputboxheight}>
      <StLabel>
        <label>{label}</label>
      </StLabel>
      <StInputFrame>
        <StInputDiv
          bordercolor={getBordercolor()}
          onFocus={onFocus}
          onBlur={onBlur}
          divwith={divwith}
        >
          <StInput
            type={showPwd ? 'text' : 'password'}
            value={value}
            maxLength="15"
            onChange={onChange}
            {...inputprops}
          />
          <StIcon onClick={toggleShowPwd} cursor="pointer">
            <img src={eye} alt="Eye Open Icon" />
          </StIcon>
        </StInputDiv>
        {value && (
          <StIcon>
            {validPwd || matchPwd ? (
              <img src={checkIcon} alt="Green Check Icon" />
            ) : (
              <img src={errorIcon} alt="Red Error Icon" />
            )}
          </StIcon>
        )}
      </StInputFrame>
      {value && <StMessage>{validPwd || matchPwd ? successmsg : errorMessage}</StMessage>}
    </StInputBox>
  );
}

export default PasswordInput;
