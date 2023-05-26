import styled from 'styled-components';

// Container
export const StContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifycontent};
  flex-direction: ${(props) => props.flexdirection};
  align-items: ${(props) => props.alignitems};
  gap: ${(props) => props.gap};
`;

// Inputs
export const StInputBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexdirection || 'column'};
  gap: 4px;
`;

export const StInputDiv = styled.div`
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  width: ${(props) => props.width || '366px'};
  height: 54px;
  padding: 17px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StInput = styled.input`
  width: ${(props) => props.inputwidth || '236px'};
  height: 20px;
`;

export const StErrorMessage = styled.span`
  color: red;
  padding-left: 8px;
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

export const StLabel = styled.label``;

export const StSpan = styled.span`
  margin-left: 4px;
  text-decoration: underline;
`;

// Buttons
// Common Button
export const StButton = styled.button`
  border: 1px solid ${(props) => props.border || 'none'};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  color: var(--color-dark-green);
  font-weight: var(--weight-bold);
  border-radius: ${(props) => props.borderradius};
  font-size: 15px;
  line-height: 20.43px;
  background-color: #fefefe;

  &:hover {
    background-color: var(--color-dark-green);
    color: var(--color-white);
  }
`;

// Kakao Button
export const StKakaoBtn = styled.button`
  img {
    width: 217px;
    height: 54px;
  }
`;
