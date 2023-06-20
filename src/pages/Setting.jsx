import React from 'react';
import background from '../asset/settingbackground.svg';
import infoIcon from '../asset/Info.svg';
import allBadge from '../asset/allbadge.svg';
import getBadgeA from '../asset/getbadge/getBadgeA.svg';
import getBadgeB from '../asset/getbadge/getBadgeB.svg';
import getBadgeC from '../asset/getbadge/getBadgeC.svg';
import getBadgeD from '../asset/getbadge/getBadgeD.svg';
import getBadgeE from '../asset/getbadge/getBadgeE.svg';
import getBadgeF from '../asset/getbadge/getBadgeF.svg';
import getBadgeG from '../asset/getbadge/getBadgeG.svg';
import nonGetBadgeA from '../asset/nongetbadge/nonGetBadgeA.svg';
import nonGetBadgeB from '../asset/nongetbadge/nonGetBadgeB.svg';
import nonGetBadgeC from '../asset/nongetbadge/nonGetBadgeC.svg';
import nonGetBadgeD from '../asset/nongetbadge/nonGetBadgeD.svg';
import nonGetBadgeE from '../asset/nongetbadge/nonGetBadgeE.svg';
import nonGetBadgeF from '../asset/nongetbadge/nonGetBadgeF.svg';
import nonGetBadgeG from '../asset/nongetbadge/nonGetBadgeG.svg';
import userImage from '../asset/greenuser.svg';
import editIcon from '../asset/editicon.svg';
import { styled } from 'styled-components';
function Setting() {
  return (
    <Stcontainer>
      {/* <Stbackground src={background} alt="" /> */}
      <StLayout>
        <Stsetting>
          <StSettingHeader>
            <div>설정</div>
          </StSettingHeader>
          <StSettingBody>
            <StprofileEdit>
              <StFontA>프로필 수정</StFontA>
              <StprofileInfoArea>
                <Stprofileimg src={userImage} alt="" />
                <div>
                  <StprofileInfoBox>
                    <span>닉네임</span>
                    <span>임의명</span>
                    <img src={editIcon} alt="" />
                  </StprofileInfoBox>
                  <StprofileInfoBox>
                    <span>칭호</span>
                    <span>새싹</span>
                    <span></span>
                  </StprofileInfoBox>
                </div>
              </StprofileInfoArea>
            </StprofileEdit>
            <StprofileEdit>
              <StFontA>개인정보 수정</StFontA>
              <div>
                <StprofileInfoBoxB>
                  <Stbox>이메일</Stbox>
                  <StboxB>immide@gmail.com</StboxB>
                  <StboxC></StboxC>
                </StprofileInfoBoxB>
                <StprofileInfoBoxB>
                  <Stbox>비밀번호</Stbox>
                  <StboxB>●●●●●●●●</StboxB>
                  <StboxC src={editIcon} alt="" />
                </StprofileInfoBoxB>
                <StprofileInfoBoxB>
                  <Stbox>비밀번호 확인</Stbox>
                  <StboxB>비밀번호 확인</StboxB>
                  <StboxC></StboxC>
                </StprofileInfoBoxB>
              </div>
            </StprofileEdit>
          </StSettingBody>
        </Stsetting>
        <StLayoutright>
          <Stmybadge>
            <StMybadgeHeader>
              <StMybadgeFontA>내 뱃지</StMybadgeFontA>
              <StMybadgeFontB>다음 칭호 획득까지</StMybadgeFontB>
              <StMybadgeFontC>50:00:00</StMybadgeFontC>
            </StMybadgeHeader>
            <StMybadgeBody>
              <StMybadgeLayout>
                <StbadgeIcon src={nonGetBadgeA} alt="" />
                <StbadgeIcon src={nonGetBadgeB} alt="" />
                <StbadgeIcon src={nonGetBadgeC} alt="" />
                <StbadgeIcon src={nonGetBadgeD} alt="" />
                <StbadgeIcon src={nonGetBadgeE} alt="" />
                <StbadgeIcon src={nonGetBadgeF} alt="" />
                <StbadgeIcon src={nonGetBadgeG} alt="" />
              </StMybadgeLayout>
            </StMybadgeBody>
          </Stmybadge>
          <StAllbadge>
            <StAllbadgeHeader>
              <p>전체 칭호</p>
              <StinfoIcon src={infoIcon} alt="" />
            </StAllbadgeHeader>
            <StAllbadgeBody>
              <StAllbadgeimg src={allBadge} alt="" />
            </StAllbadgeBody>
          </StAllbadge>
        </StLayoutright>
      </StLayout>
    </Stcontainer>
  );
}

export default Setting;

const Stcontainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLayout = styled.div`
  /* position: absolute; */
  z-index: 1;
  display: flex;
  gap: 1.7%;
  width: 83.1%;
  height: 70.4%;
`;

const Stbackground = styled.img`
  position: relative;
`;

const StLayoutright = styled.div`
  gap: 3%;
  display: flex;
  width: 71%;
  height: 100%;
  flex-direction: column;
`;
// ==============Setting Area===================
const Stsetting = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #bfbfbf;
  border-radius: 12px;
  background-color: #ffffff;
`;
const StSettingHeader = styled.div`
  height: 13.19%;
  display: flex;
  padding-left: 5.6%;
  align-items: center;
  font-size: 1.355vw;
  font-weight: 700;
  box-shadow: 0px 12px 16px -4px rgba(0, 87, 63, 0.04),
    0px 4px 6px -2px rgba(0, 87, 63, 0.02);
`;

const StSettingBody = styled.div`
  height: 86.81%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 59px;
`;
const Stprofileimg = styled.img`
  width: 148px;
  height: 148px;
`;

const StFontA = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #bfbfbf;
`;

const StprofileEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const StprofileInfoArea = styled.div`
  display: flex;
  align-items: end;
  gap: 60px;
`;

const StprofileInfoBox = styled.div`
  width: 430px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #bfbfbf;
`;

const StprofileInfoBoxB = styled.div`
  width: 634px;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bfbfbf;
`;

const Stbox = styled.span`
  width: 200px;
`;
const StboxB = styled.span`
  width: 300px;
`;
const StboxC = styled.img`
  width: 18.89px;
`;
// ==============Mybadge Area===================
const Stmybadge = styled.div`
  width: 68%;
  height: 77%;
  border-radius: 12px;
  border: 1px solid #bfbfbf;
  background-color: #ffffff;
`;
const StMybadgeHeader = styled.div`
  height: 31.355%;
  display: flex;
  padding-left: 8.94%;
  align-items: center;
  box-shadow: 0px 12px 16px -4px rgba(0, 87, 63, 0.04),
    0px 4px 6px -2px rgba(0, 87, 63, 0.02);
`;

const StMybadgeFontA = styled.p`
  font-size: 1.355vw;
  font-weight: 700;
  margin-right: 14.12%;
`;

const StMybadgeFontB = styled.span`
  font-size: 0.73vw;
  color: #9d9d9d;
  font-weight: 500;
  margin-right: 6.11%;
`;

const StMybadgeFontC = styled.span`
  font-size: 0.73vw;
  color: #00573f;
  font-weight: 500;
`;

const StMybadgeBody = styled.div`
  height: 68.645%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const StMybadgeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.78vw;
`;

const StbadgeIcon = styled.img`
  width: 3.44vw;
`;
// ==============Allbadge Area===================
const StAllbadge = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: 1px solid #bfbfbf;
  background-color: #ffffff;
`;

const StAllbadgeHeader = styled.div`
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

const StinfoIcon = styled.img`
  width: 3.34%;
`;

const StAllbadgeBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75.878%;
`;

const StAllbadgeimg = styled.img`
  width: 87.54%;
  height: 79.48%;
`;
