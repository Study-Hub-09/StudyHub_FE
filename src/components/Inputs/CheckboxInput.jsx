import React from 'react';
import {
  StCheckboxInputBox,
  StCheckboxInput,
  StCheckboxLabel,
  StCheckboxSpan,
} from '../../styles/Inputs.styles';

function CheckboxInput(props) {
  return (
    <StCheckboxInputBox>
      <StCheckboxInput type="checkbox" />
      <StCheckboxLabel>{props.label}</StCheckboxLabel>
      <StCheckboxSpan>내용보기</StCheckboxSpan>
    </StCheckboxInputBox>
  );
}

export default CheckboxInput;
