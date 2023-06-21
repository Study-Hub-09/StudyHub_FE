import React, { useState, useRef, useEffect } from 'react';
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
import imageEdit from '../asset/imageEdit.svg';
import { styled } from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getProfile, updateProfile } from '../api/api';
import Swal from 'sweetalert2';

function Setting() {
  const [nickNameEdit, setNickNameEdit] = useState(false);
  const [passWordEdit, setPassWordEdit] = useState(false);
  const [badgeInfo, setBadgeInfo] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [readerImage, setReaderImage] = useState(null);
  const [profileUptate, setProfileUpdate] = useState(false);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState({});
  const { isLoading, isError, data } = useQuery('profile', getProfile);
  const profile = data?.data;
  const [uploadedImage, setUploadedImage] = useState(profile?.imageUrl);
  //   console.log(profile);
  console.log(content);
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const cursorInputRef = useRef(null);

  useEffect(() => {
    if (nickname) {
      setContent({ ...content, nickname });
    }
    if (password) {
      setContent({ ...content, password });
    }
    if (checkPassword) {
      setContent({ ...content, checkPassword });
    }
  }, [password, nickname, checkPassword]);
  // 포커싱 처리
  useEffect(() => {
    if (nickNameEdit) {
      cursorInputRef.current.focus();
    } else if (passWordEdit) {
      cursorInputRef.current.focus();
    }
  }, [nickNameEdit, passWordEdit]);

  const mutation = useMutation(updateProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('profile');
      alert('업데이트 완료!');
      console.log(data);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedImage(file);
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        iconColor: '#00573f',
        width: 400,
        text: '이미지 파일만 업로드 가능합니다.',
        confirmButtonColor: '#00573f',
        confirmButtonText: '확인',
      });
      return;
    }

    // 이미지 미리보기 설정
    const reader = new FileReader();
    reader.onload = (event) => {
      setReaderImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const profileUpdateHandler = async () => {
    if (profileUptate) {
      setNickNameEdit(false);
      setPassWordEdit(false);
      setNickname('');
      setPassword('');
      setCheckPassword('');
      //   const content = {
      //     nickname,
      //     email: profile.email,
      //     password,
      //     checkPassword,
      //   };
      const formData = new FormData();
      const contentrString = JSON.stringify(content);
      await formData.append(
        'content',
        new Blob([contentrString], { type: 'application/json' })
      );
      if (uploadedImage) {
        formData.append('image', uploadedImage);
      }
      //   else {
      // formData.append('image', '');
      //   }

      try {
        mutation.mutate(formData);
      } catch (error) {
        console.error('업데이트 실패:', error);
      }
    } else {
      if (nickNameEdit && nickname === '') {
        Swal.fire({
          icon: 'error',
          iconColor: '#00573f',
          width: 400,
          text: '수정할 닉네임을 입력해주세요.',
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
      } else if (passWordEdit && password === '') {
        Swal.fire({
          icon: 'error',
          iconColor: '#00573f',
          width: 400,
          text: '수정할 비밀번호를 입력해주세요.',
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
      }
      if (passWordEdit && checkPassword === '' && password !== checkPassword) {
        Swal.fire({
          icon: 'error',
          iconColor: '#00573f',
          width: 400,
          text: '비밀번호를 확인해주세요.',
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
      }
    }
  };

  const nickNameEditHandler = () => {
    setProfileUpdate(true);
    setNickNameEdit(true);
  };

  const passWordEditHandler = () => {
    setProfileUpdate(true);
    setPassWordEdit(true);
  };

  const badgeInfoHandler = () => {
    setBadgeInfo(!badgeInfo);
  };

  const imageUpdateHandler = () => {
    fileInputRef.current.click();
    setProfileUpdate(true);
  };
  // 다음 칭호까지 남은 시간
  const nextGradeTime = profile?.nextGradeRemainingTime;
  const totalStudyTime = profile?.totalStudyTime;

  // 공부시간 환산
  const totalRankTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // 누적 공부 시간
  const totalStudyTimeHour = totalRankTime(totalStudyTime).split(':')[0];
  // 닉네임 input 숫자 및 특수 문자 입력 막기
  const onChangenickNameHandler = (event) => {
    const regex = /[\d~`!@#$%^&*()+=\-[\]\\';,/{}|\\":<>?_]/g;
    const filteredValue = event.target.value.replace(regex, '');
    setNickname(filteredValue);
  };

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
                <Stprofileimagebox>
                  <StimageEdit src={imageEdit} alt="" onClick={imageUpdateHandler} />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Stprofilebox>
                    <Stprofileimg
                      src={
                        readerImage
                          ? readerImage
                          : profile?.imageUrl === '대표 프로필 이미지 URL'
                          ? userImage
                          : profile?.imageUrl
                      }
                      alt=""
                    />
                  </Stprofilebox>
                </Stprofileimagebox>
                <div>
                  {nickNameEdit ? (
                    <StcheckText>
                      <StFontA>
                        한글 또는 영문 대소문자 2-10자 닉네임을 입력해주세요.
                      </StFontA>
                    </StcheckText>
                  ) : (
                    ''
                  )}
                  <StprofileInfoBox>
                    <StboxD>닉네임</StboxD>
                    {nickNameEdit ? (
                      <StpasswordB
                        type="text"
                        placeholder="닉네임을 입력해 주세요"
                        value={nickname}
                        onChange={onChangenickNameHandler}
                        ref={cursorInputRef}
                      />
                    ) : (
                      <StboxE>{profile?.nickname}</StboxE>
                    )}
                    <StboxC src={editIcon} alt="" onClick={nickNameEditHandler} />
                  </StprofileInfoBox>
                  <StprofileInfoBox>
                    <StboxD>칭호</StboxD>
                    <StFontB>{profile?.title}</StFontB>
                    <StboxC></StboxC>
                  </StprofileInfoBox>
                </div>
              </StprofileInfoArea>
            </StprofileEdit>
            <StprofileEdit>
              <StFontA>개인정보 수정</StFontA>
              <div>
                <StprofileInfoBoxB>
                  <Stbox>이메일</Stbox>
                  <StboxB>{profile?.email}</StboxB>
                  <StboxC></StboxC>
                </StprofileInfoBoxB>
                <StprofileInfoBoxB>
                  <Stbox>비밀번호</Stbox>
                  {passWordEdit ? (
                    <Stpassword
                      type="password"
                      placeholder="비밀번호 입력"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      ref={cursorInputRef}
                    />
                  ) : (
                    <StboxB>●●●●●●●●</StboxB>
                  )}
                  <StboxC src={editIcon} alt="" onClick={passWordEditHandler} />
                </StprofileInfoBoxB>
                <StprofileInfoBoxB>
                  <Stbox>비밀번호 확인</Stbox>
                  {passWordEdit ? (
                    <Stpassword
                      type="password"
                      placeholder="비밀번호 확인"
                      value={checkPassword}
                      onChange={(event) => {
                        setCheckPassword(event.target.value);
                      }}
                    />
                  ) : (
                    <StFontC>비밀번호 확인</StFontC>
                  )}
                  <StboxC></StboxC>
                </StprofileInfoBoxB>
                {/* {passWordEdit ? (
                  <StcheckText>
                    <StFontA>
                      한글 또는 영문 대소문자 2-10자 닉네임을 입력해주세요.
                    </StFontA>
                  </StcheckText>
                ) : (
                  ''
                )} */}
              </div>
            </StprofileEdit>
            {profileUptate ? (
              <StSaveButton onClick={profileUpdateHandler}>저장</StSaveButton>
            ) : (
              <StnonSaveButton></StnonSaveButton>
            )}
          </StSettingBody>
        </Stsetting>
        <StLayoutright>
          <Stmybadge>
            <StMybadgeHeader>
              <StMybadgeFontA>내 뱃지</StMybadgeFontA>
              <StMybadgeFontB>다음 칭호 획득까지</StMybadgeFontB>
              <StMybadgeFontC>{totalRankTime(nextGradeTime)}</StMybadgeFontC>
            </StMybadgeHeader>
            <StMybadgeBody>
              <StMybadgeLayout>
                <StbadgeIcon
                  src={totalStudyTimeHour > 0 ? getBadgeA : nonGetBadgeA}
                  alt=""
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 50 ? getBadgeB : nonGetBadgeB}
                  alt=""
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 200 ? getBadgeC : nonGetBadgeC}
                  alt=""
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 400 ? getBadgeD : nonGetBadgeD}
                  alt=""
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 650 ? getBadgeE : nonGetBadgeE}
                  alt=""
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 1000 ? getBadgeF : nonGetBadgeF}
                  alt=""
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 1500 ? getBadgeG : nonGetBadgeG}
                  alt=""
                />
              </StMybadgeLayout>
            </StMybadgeBody>
          </Stmybadge>
          <StAllbadge>
            <StAllbadgeHeader>
              <p>전체 칭호</p>
              <StinfoIcon src={infoIcon} alt="" onClick={badgeInfoHandler} />
              {badgeInfo ? (
                <StbadgeInfobox>
                  누적 타이머 시간에 따라 <br />
                  다양한 칭호와 뱃지를 얻을 수 있습니다.
                </StbadgeInfobox>
              ) : (
                ''
              )}
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
  gap: 9%;
`;
const Stprofileimagebox = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
`;
const StimageEdit = styled.img`
  cursor: pointer;
  width: 1.9vw;
  position: absolute;
  z-index: 1;
`;

const Stprofilebox = styled.div`
  width: 7.7vw;
  height: 13.7vh;
  border-radius: 70%;
  position: relative;
  overflow: hidden;
`;

const Stprofileimg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StFontA = styled.div`
  font-size: 0.78vw;
  font-weight: 700;
  color: #bfbfbf;
`;

const StFontB = styled.span`
  width: 100px;
  font-size: 0.78vw;
  font-weight: 500;
  color: #00573f;
`;
const StFontC = styled.span`
  font-size: 0.78vw;
  font-weight: 500;
  width: 15.625vw;
  color: #898989;
`;

const StprofileEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

const StprofileInfoArea = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  gap: 3.4vw;
`;

const StprofileInfoBox = styled.div`
  width: 22.4vw;
  height: 5vh;
  display: flex;
  font-size: 0.78vw;
  align-items: center;
  /* justify-content: space-between; */
  border-bottom: 1px solid #bfbfbf;
`;

const StprofileInfoBoxB = styled.div`
  width: 33.02vw;
  height: 5vh;
  display: flex;
  font-size: 0.78vw;
  /* justify-content: space-between; */
  align-items: center;
  border-bottom: 1px solid #bfbfbf;
`;

const Stbox = styled.span`
  width: 13.021vw;
`;
const StboxB = styled.span`
  width: 18.8vw;
`;
const StboxC = styled.img`
  width: 0.98vw;
  cursor: pointer;
`;
const StboxD = styled.span`
  width: 10.42vw;
`;
const StboxE = styled.span`
  width: 10.42vw;
`;
const Stpassword = styled.input`
  font-size: 0.78vw;
  width: 18.8vw;
`;
const StpasswordB = styled.input`
  font-size: 0.78vw;
  width: 10.42vw;
`;
const StSaveButton = styled.button`
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
const StnonSaveButton = styled.button`
  width: 6.67vw;
  height: 4.4vh;
`;

const StcheckText = styled.div`
  /* width: 6.67vw; */
  /* height: 4.4vh; */
  display: flex;
  justify-content: end;
  /* margin-bottom: 0.5vw; */
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
  cursor: pointer;
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

const StbadgeInfobox = styled.div`
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
