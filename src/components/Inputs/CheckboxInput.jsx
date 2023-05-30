import React from 'react';
import {
  StCheckboxInputBox,
  StCheckboxInput,
  StCheckboxLabel,
  StCheckboxSpan,
} from '../../styles/Inputs.styles';

function CheckboxInput({ label, id, htmlFor }) {
  return (
    <StCheckboxInputBox>
      <StCheckboxInput type="checkbox" id={id} />
      <StCheckboxLabel htmlFor={htmlFor}>{label}</StCheckboxLabel>
      <StCheckboxSpan>내용보기</StCheckboxSpan>
    </StCheckboxInputBox>
  );
}

export default CheckboxInput;
