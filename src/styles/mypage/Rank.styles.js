import { styled } from 'styled-components';

export const StContentMainRank = styled.div`
  box-sizing: border-box;
  width: 95%;
  height: 100%;
  background: var(--color-white);
  border: 1px solid var(--color-argent);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 0px 0px 10px;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainRankTitle = styled.div`
  width: 49%;
  height: 17%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1rem;
  color: var(--color-old-silver);
  padding: 0px 0px 20px 0px;
  /* margin-left: 1.125rem; */
  /* border: 1px solid #8cacff; */
`;

export const StContentMainRankName = styled.div`
  width: 80%;
  height: 40%;
  font-style: normal;
  font-weight: var(--weight-bold);
  font-size: 1.25vw;
  line-height: 1.563rem;
  color: var(--color-dark-charcoal);
  /* margin: 0.313rem 0rem 0rem 1.125rem; */
  display: flex;
  align-items: center;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainRankImg = styled.img`
  width: 25%;
  height: 70%;
`;

export const StContentMainRankNic = styled.div`
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: var(--weight-bold);
  font-size: 1.1111vw;
  line-height: 1.563rem;
  color: var(--color-dark-charcoal);
  /* margin: 0rem 0rem 0rem 0.313rem; */
  display: flex;
  align-items: center;
`;

export const StContentMainRankEx = styled.div`
  width: 100%;
  height: 22%;
  /* margin-left: 1.125rem; */
  display: flex;
  align-items: baseline;
  /* border: 1px solid #8cacff; */
`;

export const StContentMainTitelNextEx = styled.div`
  width: 48%;
  height: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1.188rem;
  color: var(--color-old-silver);
  margin-right: -8px;
  /* margin-left: 1.125rem; */
  /* border: 1px solid #8cacff; */
`;

export const StContentMainRankNextAro = styled.div`
  box-sizing: border-box;
  padding: 0px 8px 0px 1px;
  /* margin: 0rem 0.188rem 0rem 0rem; */
`;

export const StContentMainRankTime = styled.div`
  width: 40%;
  height: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 0.833vw;
  line-height: 1.188rem;
  color: var(--color-light-green);
  /* border: 1px solid #8cacff; */
`;
