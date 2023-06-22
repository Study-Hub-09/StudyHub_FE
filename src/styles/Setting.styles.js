import styled from 'styled-components';
export const Stcontainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StLayout = styled.div`
  z-index: 1;
  display: flex;
  gap: 1.7%;
  width: 83.1%;
  height: 70.4%;
`;

export const Stbackground = styled.img`
  position: relative;
`;

export const StLayoutright = styled.div`
  gap: 3%;
  display: flex;
  width: 71%;
  height: 100%;
  flex-direction: column;
`;
// ==============Setting Area===================
export const Stsetting = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #bfbfbf;
  border-radius: 12px;
  background-color: #ffffff;
`;
export const StSettingHeader = styled.div`
  height: 13.19%;
  display: flex;
  padding-left: 5.6%;
  align-items: center;
  font-size: 1.355vw;
  font-weight: 700;
  box-shadow: 0px 12px 16px -4px rgba(0, 87, 63, 0.04),
    0px 4px 6px -2px rgba(0, 87, 63, 0.02);
`;

export const StSettingBody = styled.div`
  height: 86.81%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9%;
`;
export const Stprofileimagebox = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
`;
export const StimageEdit = styled.img`
  cursor: pointer;
  width: 1.9vw;
  position: absolute;
  z-index: 1;
`;

export const Stprofilebox = styled.div`
  width: 7.7vw;
  height: 13.7vh;
  border-radius: 70%;
  position: relative;
  overflow: hidden;
`;

export const Stprofileimg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StFontA = styled.div`
  font-size: 0.78vw;
  font-weight: 700;
  color: #bfbfbf;
`;

export const StFontB = styled.span`
  width: 100px;
  font-size: 0.78vw;
  font-weight: 500;
  color: #00573f;
`;
export const StFontC = styled.span`
  font-size: 0.78vw;
  font-weight: 500;
  width: 15.625vw;
  color: #898989;
`;
export const StFontD = styled.span`
  font-size: 0.78vw;
  font-weight: 500;
  color: #898989;
`;

export const StprofileEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

export const StprofileEditB = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  height: 21.1vh;
`;

export const StprofileInfoArea = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  gap: 3.4vw;
`;

export const StprofileInfoBox = styled.div`
  width: 22.4vw;
  height: 5vh;
  display: flex;
  font-size: 0.78vw;
  align-items: center;
  border-bottom: 1px solid #bfbfbf;
`;

export const StprofileInfoBoxB = styled.div`
  width: 33.02vw;
  height: 5vh;
  display: flex;
  font-size: 0.78vw;
  align-items: center;
  border-bottom: 1px solid #bfbfbf;
`;

export const Stbox = styled.span`
  width: 13.021vw;
`;
export const StboxB = styled.span`
  width: 18.8vw;
`;
export const StboxC = styled.img`
  width: 0.98vw;
  cursor: pointer;
`;
export const StboxD = styled.span`
  width: 10.42vw;
`;

export const Stpassword = styled.input`
  font-size: 0.78vw;
  width: 18.8vw;
`;
export const StpasswordB = styled.input`
  font-size: 0.78vw;
  width: 10.42vw;
`;
export const StSaveButton = styled.button`
  border: 1px solid #bfbfbf;
  width: 6.67vw;
  height: 4.4vh;
  background-color: #fefefe;
  border-radius: 30px;
  color: #00573f;
  font-size: 0.78vw;
  font-weight: 700;
  &:hover {
    color: #ffffff;
    background-color: #00573f;
  }
`;
export const StnonSaveButton = styled.button`
  width: 6.67vw;
  height: 4.4vh;
`;

export const StcheckText = styled.div`
  display: flex;
  justify-content: end;
`;
// ==============Mybadge Area===================
export const Stmybadge = styled.div`
  width: 68%;
  height: 77%;
  border-radius: 12px;
  border: 1px solid #bfbfbf;
  background-color: #ffffff;
`;
export const StMybadgeHeader = styled.div`
  height: 31.355%;
  display: flex;
  padding-left: 8.94%;
  align-items: center;
  box-shadow: 0px 12px 16px -4px rgba(0, 87, 63, 0.04),
    0px 4px 6px -2px rgba(0, 87, 63, 0.02);
`;

export const StMybadgeFontA = styled.p`
  font-size: 1.355vw;
  font-weight: 700;
  margin-right: 14.12%;
`;

export const StMybadgeFontB = styled.span`
  font-size: 0.73vw;
  color: #9d9d9d;
  font-weight: 500;
  margin-right: 6.11%;
`;

export const StMybadgeFontC = styled.span`
  font-size: 0.73vw;
  color: #00573f;
  font-weight: 500;
`;

export const StMybadgeBody = styled.div`
  height: 68.645%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const StMybadgeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.78vw;
`;

export const StbadgeIcon = styled.img`
  width: 3.44vw;
`;
// ==============Allbadge Area===================
export const StAllbadge = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: 1px solid #bfbfbf;
  background-color: #ffffff;
`;

export const StAllbadgeHeader = styled.div`
  height: 24.122%;
  display: flex;
  padding-left: 5.6%;
  align-items: center;
  font-size: 1.355vw;
  font-weight: 700;
  gap: 2%;
  box-shadow: 0px 12px 16px -4px rgba(0, 87, 63, 0.04),
    0px 4px 6px -2px rgba(0, 87, 63, 0.02);
`;

export const StinfoIcon = styled.img`
  width: 3.34%;
  cursor: pointer;
`;

export const StAllbadgeBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75.878%;
`;

export const StAllbadgeimg = styled.img`
  width: 87.54%;
  height: 79.48%;
`;

export const StbadgeInfobox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14.49vw;
  height: 6.575vh;
  font-size: 0.73vw;
  color: #9d9d9d;
  font-weight: 500;
  padding: 1.39vh 1.042vw;
  box-shadow: 0px 12px 16px -4px rgba(0, 87, 63, 0.04),
    0px 4px 6px -2px rgba(0, 87, 63, 0.02);
  border-radius: 12px;
`;
