import React from 'react';
import {
  StIcon,
  StInput,
  StInputBox,
  StInputDiv,
  StInputFrame,
  StMessage,
} from '../../styles/Inputs.styles';
import errorIcon from '../../assets/Icons/errorIcon.svg';

function NicknameInput(props) {
  return (
    <StInputBox>
      <label>닉네임</label>
      <StInputFrame>
        <StInputDiv>
          <StInput
            type="text"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            inputwidth={props.inputwidth}
          />
        </StInputDiv>
        <StIcon>
          <img src={errorIcon} alt="Red Error Icon" />
        </StIcon>
      </StInputFrame>
      <StMessage>필수 입력칸입니다</StMessage>
    </StInputBox>
  );
}

export default NicknameInput;
