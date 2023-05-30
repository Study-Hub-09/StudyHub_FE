import React, { useEffect, useRef } from 'react';
import {
  StInputBox,
  StInputFrame,
  StInputDiv,
  StInput,
  StIcon,
  StMessage,
} from '../../styles/Inputs.styles';
import errorIcon from '../../assets/Icons/errorIcon.svg';
import checkIcon from '../../assets/Icons/checkIcon.svg';
import Button from '../Buttons/Button';

function NicknameInput({
  onClick,
  value,
  button,
  validNickname,
  successMessage,
  errorMessage,
  onFocus,
  onBlur,
  bordercolor,
  ...inputprops
}) {
  const nicknameRef = useRef();

  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  const getBordercolor = () => {
    if (value) {
      return validNickname ? 'green' : 'red';
    }
    return bordercolor;
  };

  return (
    <StInputBox>
      <label>닉네임</label>
      <StInputFrame>
        <StInputDiv bordercolor={getBordercolor()} onFocus={onFocus} onBlur={onBlur}>
          <StInput ref={nicknameRef} type="text" value={value} {...inputprops} />
          <Button
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
            {validNickname ? (
              <img src={checkIcon} alt="Green Check Icon" />
            ) : (
              <img src={errorIcon} alt="Red Error Icon" />
            )}
          </StIcon>
        )}
      </StInputFrame>
      {value && <StMessage>{validNickname ? successMessage : errorMessage}</StMessage>}
    </StInputBox>
  );
}

export default NicknameInput;
