import { styled } from 'styled-components';

export const StSelectbox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 10px 0px;
  border-radius: 12px;
  border: 1px solid var(--color-argent);
  margin-top: 26px;
  background-color: white;
  z-index: 1;
`;
export const Stbtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: lightgray;
  }
`;

export const Stfont = styled.span`
  width: 40px;
  display: flex;
`;

export const StCheckmark = styled.img`
  position: absolute;
  left: 17.29px;
`;
