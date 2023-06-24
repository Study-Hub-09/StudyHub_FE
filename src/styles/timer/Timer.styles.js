import { styled } from 'styled-components';

export const StTimerContainer = styled.div`
  /* width: 272px; */
  /* height: 71px; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.3vw;
  /* gap: 25px; */
`;

export const StTimer = styled.div`
  /* width: 209px; */
  /* height: 71px; */
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  /* font-size: 52px; */
  font-size: 2.7vw;
  /* line-height: 71px; */
  /* margin-right: 30px; */
  color: #ea4335;
  ${({ isPaused }) =>
    !isPaused &&
    `
    color: #ffffff;
  `}
`;

export const StTimerImg = styled.img`
  /* width: 48px; */
  width: 2.6vw;
  /* height: 48px; */
  cursor: pointer;
`;
