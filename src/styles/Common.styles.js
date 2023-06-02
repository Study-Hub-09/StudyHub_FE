import { Link } from 'react-router-dom';
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

export const StKakaoBtn = styled(Link)`
  width: 215px;
  height: 54px;
`;

// ===============KAKAO REDIRECT PAGE================ //
export const StKakaoRedirectContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StKakaoRedirectBox = styled.div`
  width: 506px;
  height: 173px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StKakaoRedirectHeader = styled.header`
  width: 370px;
  height: 82px;

  h1 {
    font-size: 60px;
    font-weight: var(--weight-bold);
    letter-spacing: 20px;
  }
`;

export const StKakaoRedirectContent = styled.div`
  width: 506px;
  height: 59px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    width: ${(props) => props.width};
    font-size: 19px;
    font-weight: var(--weight-semi-bold);
    letter-spacing: 5px;
  }
`;
