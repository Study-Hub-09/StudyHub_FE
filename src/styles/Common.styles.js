import styled from 'styled-components';

// ===============CONTAINER================ //

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

// ===============BUTTONS================ //
// ===============COMMON BUTTON================ //

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

// ===============KAKAO BUTTON================ //

export const StKakaoBtn = styled.button`
  width: 215px;
  height: 54px;
`;
