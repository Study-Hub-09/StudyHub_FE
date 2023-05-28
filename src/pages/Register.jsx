import React, { useState } from 'react';
import Container from '../components/Container/Container';
import NicknameInput from '../components/Inputs/NicknameInput';
import EmailInput from '../components/Inputs/EmailInput';
import Button from '../components/Buttons/Button';
import PasswordInput from '../components/Inputs/PasswordInput';
import CheckboxInput from '../components/Inputs/CheckboxInput';
import KakaoButton from '../components/Buttons/KakaoButton';
import {
  StRegisterSection,
  StRegisterFooter,
  StRegisterBox,
  StHeader,
  StForm,
  StSocialField,
  StInputField,
  StPolicyField,
  StCheckboxInputField,
} from '../styles/Register.styles';
import { Link } from 'react-router-dom';

function Register() {
  const [values, setValues] = useState({
    nickname: '',
    email: '',
    checkCode: '',
    password: '',
    checkPassword: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Container
      display="flex"
      flexdirection="column"
      justifycontent="center"
      alignitems="center"
      gap="12px"
    >
      {values.nickname}
      {values.email}
      {values.checkCode}
      {values.password}
      {values.checkPassword}
      <StRegisterSection>
        <StRegisterBox>
          <StHeader>
            <h1>회원가입</h1>
          </StHeader>
          <StForm>
            {/* 닉네임 영역 */}
            <NicknameInput
              name="nickname"
              value={values.nickname}
              onChange={onChangeHandler}
              placeholder="닉네임"
              inputwidth="280px"
            />

            {/* 이메일 영역 */}
            <StInputField>
              {/* 1. 이메일 주소 */}
              <EmailInput
                name="email"
                value={values.email}
                onChange={onChangeHandler}
                label="이메일 주소"
                placeholder="이메일 주소"
                button="발송"
                inputwidth="193px"
                message="잘못된 이메일 형식입니다."
              />

              {/* 2. 인증번호 */}
              <EmailInput
                name="checkCode"
                value={values.checkCode}
                onChange={onChangeHandler}
                label="인증번호"
                placeholder="1234"
                button="확인"
                inputboxwidth="255px"
                divwith="227px"
                inputwidth="85px"
                message="잘못된 번호입니다. 다시 시도해주세요."
              />
            </StInputField>

            {/* 비밀번호 영역 */}
            <StInputField>
              {/* 1. 비밀번호 */}
              <PasswordInput
                name="password"
                value={values.password}
                onChange={onChangeHandler}
                label="비밀번호"
                inputboxheight="138px"
                inputwidth="243px"
                messageheight="57px"
                messagewidth="335px"
                message="알파벳 소문자, 대문자, 숫자 포함, 특수문자($, @, !, %, *, ?, &, (,))를 포함한 8-15자 사이의 비밀번호를 입력해주세요."
              />

              {/* 2. 비밀번호 확인 */}
              <PasswordInput
                name="checkPassword"
                value={values.checkPassword}
                onChange={onChangeHandler}
                label="비밀번호 확인"
                inputwidth="243px"
                message="비밀번호가 일치하지 않습니다."
              />
            </StInputField>

            {/* 약관 및 회원가입 버튼 영역 */}
            <StPolicyField>
              <StCheckboxInputField>
                <CheckboxInput label="서비스 약관에 동의합니다." />
                <CheckboxInput label="개인정보 수집 및 이용에 동의합니다." />
              </StCheckboxInputField>
              <Button
                width="156px"
                height="48px"
                padding="14px 50px"
                border="var(--color-gray)"
                borderradius="30px"
              >
                회원가입
              </Button>
            </StPolicyField>
          </StForm>

          {/* 소셜 로그인 영역 */}
          <StSocialField>
            <p>SNS 계정으로 시작하기</p>
            <KakaoButton />
          </StSocialField>
        </StRegisterBox>
      </StRegisterSection>

      <StRegisterFooter>
        <p>이미 계정이 있으신가요?</p>
        <Link to="/members/login">로그인</Link>
      </StRegisterFooter>
    </Container>
  );
}

export default Register;
