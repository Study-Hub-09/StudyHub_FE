import React from 'react';
import {
  StCheckboxInputBox,
  StCheckboxInput,
  StCheckboxLabel,
} from '../../styles/Inputs.styles';

function CheckboxInput({ label, id, htmlFor, name, onChange }) {
  return (
    <StCheckboxInputBox>
      <StCheckboxInput type="checkbox" id={id} name={name} onChange={onChange} />
      <StCheckboxLabel htmlFor={htmlFor}>{label}</StCheckboxLabel>
    </StCheckboxInputBox>
  );
}

export default CheckboxInput;
