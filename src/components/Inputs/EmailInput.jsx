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

function EmailInput(props) {
  return (
    <StInputBox inputboxwidth={props.inputboxwidth}>
      <label>{props.label}</label>
      <StInputFrame>
        <StInputDiv divwith={props.divwith}>
          <StInput
            type="text"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            inputwidth={props.inputwidth}
          />
          <Button
            width="82px"
            height="36px"
            border="var(--color-gray)"
            padding="8px 27px"
            borderradius="47px"
          >
            {props.button}
          </Button>
        </StInputDiv>
        <StIcon>
          <img src={errorIcon} alt="Red Error Icon" />
        </StIcon>
      </StInputFrame>
      <StMessage>{props.message}</StMessage>
    </StInputBox>
  );
}

export default EmailInput;
