import React from 'react';
import {
  StInputBox,
  StInputFrame,
  StInputDiv,
  StInput,
  StIcon,
  StMessage,
} from '../../styles/Inputs.styles';
import errorIcon from '../../assets/Icons/errorIcon.svg';
import eye from '../../assets/Icons/eye.svg';

function PasswordInput(props) {
  return (
    <StInputBox inputboxwidth={props.inputboxwidth} inputboxheight={props.inputboxheight}>
      <label>{props.label}</label>
      <StInputFrame>
        <StInputDiv divwith={props.divwith}>
          <StInput
            type="password"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            inputwidth={props.inputwidth}
          />
          <StIcon>
            <img src={eye} alt="Eye Open Icon" />
          </StIcon>
        </StInputDiv>
        <StIcon>
          <img src={errorIcon} alt="Red Error Icon" />
        </StIcon>
      </StInputFrame>
      <StMessage messagewidth={props.messagewidth} messageheight={props.messageheight}>
        {props.message}
      </StMessage>
    </StInputBox>
  );
}

export default PasswordInput;
