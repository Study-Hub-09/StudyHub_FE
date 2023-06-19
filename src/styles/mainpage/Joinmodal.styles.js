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
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 532px;
  height: 497px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
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
  font-weight: 700;
  margin-bottom: 9.39px;
`;

export const Stcategory = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #90b54c;
  margin-bottom: 27px;
`;

export const Stcontent = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #848484;
  width: 420px;
  height: 120px;
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
  color: #90b54c;
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
  font-weight: 700;
  line-height: 20px;
  background-color: #fefefe;
  color: #00574f;
  border: 1px solid #bfbfbf;
  margin-left: 17px;
  &:hover {
    background-color: #00574f;
    color: #fefefe;
  }
`;

export const StpasswordInput = styled.input`
  width: 68px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 7px;
  padding-left: 14px;
  border: 1px solid #9d9d9d;
  margin-left: 14px;
`;
