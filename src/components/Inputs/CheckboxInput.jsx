import React from 'react';
import {
  StCheckboxInputBox,
  StCheckboxInput,
  StCheckboxLabel,
  StCheckboxSpan,
} from '../../styles/Inputs.styles';

function CheckboxInput({ label, id, htmlFor, name, onChange }) {
  return (
    <StCheckboxInputBox>
      <StCheckboxInput type="checkbox" id={id} name={name} onChange={onChange} />
      <StCheckboxLabel htmlFor={htmlFor}>{label}</StCheckboxLabel>
      <StCheckboxSpan>내용보기</StCheckboxSpan>
    </StCheckboxInputBox>
  );
}

export default CheckboxInput;
