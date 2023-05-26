import React from 'react';
import { StCheckboxInput, StInputBox, StLabel, StSpan } from '../../styles/Common.styles';

function CheckboxInputForm(props, flexdirection) {
  return (
    <StInputBox flexdirection={flexdirection}>
      <StCheckboxInput type={props.type} />
      <StLabel>{props.label}</StLabel>
      <StSpan>내용보기</StSpan>
    </StInputBox>
  );
}

export default CheckboxInputForm;
