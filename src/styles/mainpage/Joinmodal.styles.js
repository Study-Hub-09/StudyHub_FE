import { styled } from 'styled-components';

export const Stcontainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Stmodalbox = styled.div`
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 532px;
  height: 497px;
  border-radius: 20px;
  border: 1px solid var(--color-argent);
  padding: 36px, 56px, 60px;
  gap: 10px;
`;

export const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 401px;
`;

export const Stheadericon = styled.div`
  width: 100px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
`;

export const Sttitle = styled.div`
  font-size: 32px;
  font-weight: var(--weight-bold);
  margin-bottom: 9.39px;
`;

export const Stcategory = styled.div`
  font-size: 18px;
  font-weight: var(--weight-regular);
  color: var(--color-light-green);
  margin-bottom: 27px;
`;

export const Stcontent = styled.div`
  font-size: 18px;
  font-weight: var(--weight-regular);
  color: var(--color-old-silver);
  width: 420px;
  height: 120px;
`;

export const Stroomboxlmage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;

export const Stheaderbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 27px;
`;
export const StroomCount = styled.div`
  display: flex;
  gap: 9px;
  color: var(--color-light-green);
  font-weight: 500;
  font-size: 15px;
`;
export const Stjoinbuttonlayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

export const Stcancelimg = styled.img`
  cursor: pointer;
`;

export const Stjoinbutton = styled.button`
  width: 104px;
  height: 40px;
  border-radius: 30px;
  font-weight: var(--weight-bold);
  line-height: 20px;
  background-color: var(--color-white-gray);
  color: var(--color-dark-green);
  border: 1px solid var(--color-argent);
  margin-left: 17px;
  &:hover {
    background-color: var(--color-dark-green);
    color: var(--color-white-gray);
  }
`;

export const StpasswordInput = styled.input`
  width: 68px;
  height: 32px;
  background-color: var(--color-white);
  border-radius: 7px;
  padding-left: 14px;
  border: 1px solid var(--color-gray);
  margin-left: 14px;
`;
