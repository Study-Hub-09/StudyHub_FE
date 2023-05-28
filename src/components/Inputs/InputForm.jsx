import React from 'react';
import {
  StInputDiv,
  StInput,
  StInputBox,
  StLabel,
  StErrorMessage,
} from '../../styles/Common.styles';
import Button from '../Buttons/Button';

function InputForm(props) {
  return (
    <StInputBox>
      <StLabel>{props.label}</StLabel>
      <StInputDiv width={props.width}>
        <StInput
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          placeholder={props.placeholder}
          type={props.type}
          inputwidth={props.inputwidth}
        />
        {(props.button && (
          <Button
            width="82px"
            height="36px"
            borderradius="47px"
            border="var(--color-gray)"
          >
            {props.button}
          </Button>
        )) ||
          (props.icon && props.icon)}
      </StInputDiv>
      <StErrorMessage>{props.errorMessage}</StErrorMessage>
    </StInputBox>
  );
}

export default InputForm;
