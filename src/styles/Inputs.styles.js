import styled from 'styled-components';

// ===============COMMON INPUT================ //

export const StInputBox = styled.div`
  width: ${(props) => props.inputboxwidth || '363px'};
  height: ${(props) => props.inputboxheight || '100px'};
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    height: 19px;
    font-size: var(--font-small);
  }
`;

export const StInputFrame = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StInputDiv = styled.div`
  width: ${(props) => props.divwith || '335px'};
  height: 54px;
  border: 1px solid ${(props) => props.bordercolor};
  border-radius: 8px;
  background-color: var(--color-white);
  padding: 13px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StLabel = styled.div`
  width: 80px;
  display: flex;
  gap: 8px;
`;

export const StInput = styled.input`
  width: ${(props) => props.inputwidth};
  padding: 4px;
`;

export const StIcon = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => props.cursor};
`;

export const StMessage = styled.span`
  width: ${(props) => props.messagewidth || '335px'};
  height: ${(props) => props.messageheight || '19px'};
  font-size: var(--font-small);
  line-height: 19.07px;
  color: var(--color-gray);
`;

// ===============CHECKBOX INPUT================ //

export const StCheckboxInputBox = styled.div`
  width: 366px;
  height: 24px;
  display: flex;
  align-items: center;
`;

export const StCheckboxLabel = styled.label`
  font-size: var(--font-small);
`;

export const StCheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--color-outline);
  background-color: var(--color-light-gray);
  appearance: none;
  margin-right: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:checked {
    background: var(--color-dark-green);
    outline: 1px solid var(--color-dark-green);
    border: 4px solid var(--color-white);
  }
`;

export const StCheckboxSpan = styled.span`
  margin-left: 4px;
  text-decoration: underline;
  font-size: var(--font-small);
`;
