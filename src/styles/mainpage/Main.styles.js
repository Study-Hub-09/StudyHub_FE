import { styled } from 'styled-components';

export const Stcontainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StTopline = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StContents = styled.div`
  width: 1018px;
  height: 642px;
`;

export const StTitlebox = styled.div`
  width: 301px;
  height: 75.39px;
  gap: 9.39px;
  display: flex;
  flex-direction: column;
`;

export const StTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

export const Stsubtitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #84848484;
`;

export const StSearchbox = styled.div`
  gap: 24px;
  display: flex;
  height: 44px;
  align-items: center;
`;

export const StSearchinput = styled.input`
  position: relative;
  width: 229px;
  height: 36px;
  background-color: #e8e8e8;
  border-radius: 12px;
  padding-left: 43px;
  font-size: 15px;
`;

export const StSearchicon = styled.img`
  position: absolute;
  transform: translateX(14px);
  z-index: 1;
`;

export const StButton = styled.button`
  width: 141px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  color: #00573f;
  border: 1px solid #bfbfbf;
  &:hover {
    border: none;
    color: #ffffff;
    background-color: #00573f;
  }
`;

export const Stroombox = styled.div`
  width: 485px;
  height: 125px;
  border: 1px solid #bfbfbfbf;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 19px 24px;
  cursor: pointer;
  background-color: white;
  &:hover {
    border: 1px solid #00573f;
  }
`;

export const Stfilterbox = styled.div`
  display: flex;
  justify-content: end;
  gap: 21px;
  margin-top: 90px;
  margin-bottom: 10px;
`;

export const StroomArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 15px 40px;
`;

export const Stroomboxlayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Stroomboxlmage = styled.img`
  width: 82px;
  height: 82px;
  object-fit: cover;
`;

export const Stroomtext = styled.div`
  display: flex;
  flex-direction: column;
  width: 67%;
  gap: 13px;
  padding-left: 26px;
  height: 100%;
`;

export const Stroomtitle = styled.div`
  font-weight: 700;
  font-size: 15px;
`;

export const Stroomsubtitle = styled.div`
  font-weight: 500;
  font-size: 15px;
`;

export const Stroomcountarea = styled.div`
  display: flex;
  gap: 17px;
  transform: translate3d(0px, 40px, 0px);
  align-items: center;
`;

export const Stroomcount = styled.div`
  display: flex;
  gap: 10px;
  font-size: 15px;
  color: #90b54c;
  width: 65px;
  font-weight: 500;
`;

export const Stcheckboximg = styled.img`
  transform: translateX(14px);
  cursor: pointer;
`;

export const Stallowbox = styled.div`
  width: 1018px;
  display: flex;
  justify-content: end;
  /* gap: 21px; */
`;

export const Stallowicon = styled.img`
  cursor: pointer;
`;

export const StCategoryButton = styled.img`
  cursor: pointer;
  margin-left: 10px;
`;

export const StEmptyImage = styled.img`
  width: 1020px;
  height: 599px;
  transform: translateY(-100px);
`;
