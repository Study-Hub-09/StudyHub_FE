import React, { useState, useRef, useEffect } from 'react';
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getProfile, updateProfile } from '../api/api';
import Swal from 'sweetalert2';
import {
  Stcontainer,
  StLayout,
  StLayoutright,
  Stsetting,
  StSettingHeader,
  StSettingBody,
  Stprofileimagebox,
  StimageEdit,
  Stprofilebox,
  Stprofileimg,
  StFontA,
  StFontB,
  StFontC,
  StFontD,
  StprofileEdit,
  StprofileEditB,
  StprofileInfoArea,
  StprofileInfoBox,
  StprofileInfoBoxB,
  Stbox,
  StboxB,
  StboxC,
  StboxD,
  Stpassword,
  StpasswordB,
  StSaveButton,
  StnonSaveButton,
  StcheckText,
  Stmybadge,
  StMybadgeHeader,
  StMybadgeFontA,
  StMybadgeFontB,
  StMybadgeFontC,
  StMybadgeBody,
  StMybadgeLayout,
  StbadgeIcon,
  StAllbadge,
  StAllbadgeHeader,
  StinfoIcon,
  StAllbadgeBody,
  StAllbadgeimg,
  StbadgeInfobox,
} from '../styles/Setting.styles';

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

  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const cursorInputRef = useRef(null);

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
      Swal.fire({
        icon: 'success',
        iconColor: '#00573f',
        width: 400,
        text: '수정이 완료되었습니다',
        confirmButtonColor: '#00573f',
        confirmButtonText: '확인',
      });
      setNickNameEdit(false);
      setPassWordEdit(false);
      setNickname('');
      setPassword('');
      setCheckPassword('');
      setProfileUpdate(false);
      setContent({});
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
    const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?=\S+$).{8,15}$/;
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
    } else if (passWordEdit && !PWD_REGEX.test(password)) {
      Swal.fire({
        icon: 'error',
        iconColor: '#00573f',
        width: 400,
        text: '비밀번호는 최소 8자 이상 15자 이하이며,\n알파벳 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
        confirmButtonColor: '#00573f',
        confirmButtonText: '확인',
      });
    } else if (checkPassword !== password) {
      Swal.fire({
        icon: 'error',
        iconColor: '#00573f',
        width: 400,
        text: '비밀번호를 확인해 주세요.',
        confirmButtonColor: '#00573f',
        confirmButtonText: '확인',
      });
    } else {
      const formData = new FormData();
      const contentrString = JSON.stringify(content);
      await formData.append(
        'content',
        new Blob([contentrString], { type: 'application/json' })
      );
      if (uploadedImage) {
        formData.append('image', uploadedImage);
      }
      try {
        mutation.mutate(formData);
      } catch (error) {
        console.error('업데이트 실패:', error);
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
    setContent({ ...content, nickname: filteredValue });
  };

  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
    setContent({ ...content, password: event.target.value });
  };

  const onChangecheckPasswordHandler = (event) => {
    setCheckPassword(event.target.value);
    setContent({ ...content, checkPassword: event.target.value });
  };

  return (
    <Stcontainer>
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
                  <StimageEdit
                    src={imageEdit}
                    alt="imageEditIcon unable"
                    onClick={imageUpdateHandler}
                  />
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
                          : profile?.imageUrl === '대표 프로필 이미지 URL' ||
                            profile?.imageUrl === null
                          ? userImage
                          : profile?.imageUrl
                      }
                      alt="readerImage unable"
                    />
                  </Stprofilebox>
                </Stprofileimagebox>
                <div>
                  {nickNameEdit ? (
                    <StcheckText>
                      <StFontD>
                        한글 또는 영문 대소문자 2-10자 닉네임을 입력해주세요.
                      </StFontD>
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
                        maxLength={10}
                      />
                    ) : (
                      <StboxD>{profile?.nickname}</StboxD>
                    )}
                    <StboxC
                      src={editIcon}
                      alt="editImage unable"
                      onClick={nickNameEditHandler}
                    />
                  </StprofileInfoBox>
                  <StprofileInfoBox>
                    <StboxD>칭호</StboxD>
                    <StFontB>{profile?.title}</StFontB>
                    <StboxC></StboxC>
                  </StprofileInfoBox>
                </div>
              </StprofileInfoArea>
            </StprofileEdit>
            <StprofileEditB>
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
                      onChange={onChangePasswordHandler}
                      ref={cursorInputRef}
                      minLength={8}
                      maxLength={15}
                    />
                  ) : (
                    <StboxB>●●●●●●●●</StboxB>
                  )}
                  <StboxC
                    src={editIcon}
                    alt="editImage unable"
                    onClick={passWordEditHandler}
                  />
                </StprofileInfoBoxB>
                <StprofileInfoBoxB>
                  <Stbox>비밀번호 확인</Stbox>
                  {passWordEdit ? (
                    <Stpassword
                      type="password"
                      placeholder="비밀번호 확인"
                      value={checkPassword}
                      onChange={onChangecheckPasswordHandler}
                      minLength={8}
                      maxLength={15}
                    />
                  ) : (
                    <StFontC>비밀번호 확인</StFontC>
                  )}
                  <StboxC></StboxC>
                </StprofileInfoBoxB>
                {passWordEdit ? (
                  <StcheckText>
                    <StFontD>
                      알파벳 소문자, 대문자, 숫자, 특수문자를 포함한 8-15자 사이의
                      비밀번호를 입력해주세요.
                    </StFontD>
                  </StcheckText>
                ) : (
                  ''
                )}
              </div>
            </StprofileEditB>
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
                  alt="badgeAImage unable"
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 50 ? getBadgeB : nonGetBadgeB}
                  alt="badgeBImage unable"
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 200 ? getBadgeC : nonGetBadgeC}
                  alt="badgeCImage unable"
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 400 ? getBadgeD : nonGetBadgeD}
                  alt="badgeDImage unable"
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 650 ? getBadgeE : nonGetBadgeE}
                  alt="badgeEImage unable"
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 1000 ? getBadgeF : nonGetBadgeF}
                  alt="badgeFImage unable"
                />
                <StbadgeIcon
                  src={totalStudyTimeHour > 1500 ? getBadgeG : nonGetBadgeG}
                  alt="badgeGImage unable"
                />
              </StMybadgeLayout>
            </StMybadgeBody>
          </Stmybadge>
          <StAllbadge>
            <StAllbadgeHeader>
              <p>전체 칭호</p>
              <StinfoIcon
                src={infoIcon}
                alt="infoImage unable"
                onClick={badgeInfoHandler}
              />
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
              <StAllbadgeimg src={allBadge} alt="allBadgeInfoImage unable" />
            </StAllbadgeBody>
          </StAllbadge>
        </StLayoutright>
      </StLayout>
    </Stcontainer>
  );
}

export default Setting;
