import React, { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import NicknameInput from '../components/Inputs/NicknameInput';
import EmailInput from '../components/Inputs/EmailInput';
import Button from '../components/Buttons/Button';
import PasswordInput from '../components/Inputs/PasswordInput';
import CheckboxInput from '../components/Inputs/CheckboxInput';
import KakaoButton from '../components/Buttons/KakaoButton';
import alertIcon from '../assets/Icons/alertIcon.svg';
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
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { register, validateEmail, validateNickname } from '../core/api/auth/register';
import { KAKAO_AUTH_URL } from '../core/api/auth/OAuth';

function Register() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerification, setEmailVerification] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState(false);
  const [validNickname, setValidNickname] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [nicknameSuccessMessage, setNicknameSuccessMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');

  const [emailSuccessMessage, setEmailSuccessMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [emailCodeSuccessMessage, setEmailCodeSuccessMessage] = useState('');
  const [emailCodeErrorMessage, setEmailCodeErrorMessage] = useState('');

  const [pwdErrorMessage, setPwdErrorMessage] = useState('');
  const [pwdMatchErrorMessage, setPwdMatchErrorMessage] = useState('');

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

  const registerMutation = useMutation(register, {
    async onSuccess(response) {
      console.log(response.data.message);
      const statusCode = response.status;
      if (statusCode === 200) {
        alert('회원가입 성공!');
        setTimeout(() => {
          navigate('/members/login');
        }, 500);
      }
    },
    async onError(error) {
      console.log('Register.jsx ERROR=====> ', error);
    },
  });

  // 회원가입 폼 버튼 핸들러
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      values.nickname === '' ||
      values.email === '' ||
      values.checkCode === '' ||
      values.password === '' ||
      values.checkPassword === ''
    ) {
      return alert('모든 칸을 입력해주세요.');
    } else {
      registerMutation.mutate({
        nickname: values.nickname,
        email: values.email,
        password: values.password,
        checkPassword: values.checkPassword,
      });
    }
  };

  // 닉네임 확인 함수
  const validateNickNameMutation = useMutation(validateNickname, {
    async onSuccess(response) {
      const duplicateNickname = response.data.data;
      console.log(duplicateNickname);
      if (duplicateNickname === true) {
        setNicknameSuccessMessage('닉네임 중복 확인되었습니다.');
      } else if (duplicateNickname === false) {
        setNicknameErrorMessage('중복된 닉네임입니다');
        setValidNickname(false);
      }
    },
    async onError(error) {
      console.log(error);
    },
  });

  // 중복 닉네임 확인 버튼 핸들러
  const validateNicknameHandler = (e) => {
    e.preventDefault();
    validateNickNameMutation.mutate({
      nickname: values.nickname,
    });
  };

  // 이메일 확인 함수
  const validateEmailMutation = useMutation(validateEmail, {
    async onSuccess(response) {
      const statusCode = response.status;
      if (statusCode === 200) {
        setEmailVerification(true);
        setEmailSuccessMessage('이메일이 발송되었습니다');
        setVerificationCode(response.data);
      }
    },
    async onError(error) {
      const statusCode = error.response.data.statusCode;
      console.log('statusCode', statusCode);

      if (statusCode === 400) {
        setEmailErrorMessage('중복된 이메일입니다');
        setValidEmail(false);
      }
    },
  });

  // 이메일 확인 버튼 핸들러
  const validateEmailHandler = (e) => {
    e.preventDefault();
    validateEmailMutation.mutate({
      email: values.email,
    });
  };

  // 인증번호 확인 버튼 핸들러
  const verificateCodeHandler = (e) => {
    e.preventDefault();
    if (values.checkCode === verificationCode) {
      setValidCode(true);
    } else {
      setValidCode(false);
    }
  };

  // 닉네임 유효성 검사
  useEffect(() => {
    if (values.nickname) {
      const NICKNAME_REGEX = /^[a-zA-Z가-힣]{2,10}$/;
      const result = NICKNAME_REGEX.test(values.nickname);
      setValidNickname(result);

      if (result && values.nickname.length >= 2) {
        setNicknameSuccessMessage('사용 가능한 닉네임입니다.');
        setNicknameErrorMessage('');
      } else {
        setNicknameSuccessMessage('');
        setNicknameErrorMessage('한글 또는 영문 대소문자 2-10자 닉네임을 입력해주세요');
      }
    } else {
      setNicknameSuccessMessage('');
      setNicknameErrorMessage('');
    }
  }, [values.nickname]);

  // 이메일 유효성 검사
  useEffect(() => {
    if (values.email) {
      const EMAIL_REGEX = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const result = EMAIL_REGEX.test(values.email);
      setValidEmail(result);
      if (result) {
        setEmailSuccessMessage('사용가능한 이메일입니다');
        setEmailErrorMessage('');
      } else {
        setEmailSuccessMessage('');
        setEmailErrorMessage('잘못된 이메일 형식입니다');
      }
    } else {
      setEmailSuccessMessage('');
      setEmailErrorMessage('');
    }
  }, [values.email]);

  // 발송 클릭시 이메일 인증확인
  useEffect(() => {
    if (validCode) {
      setEmailCodeSuccessMessage('이메일 인증이 완료 되었습니다.');
      setEmailCodeErrorMessage('');
    } else {
      setEmailCodeSuccessMessage('');
      setEmailCodeErrorMessage('올바른 인증 코드를 입력해주세요.');
    }
  }, [validCode]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (values.password) {
      const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=\S+$).{8,15}$/;
      const result = PWD_REGEX.test(values.password);
      setValidPwd(result); // 상태 값 변경 : false -> true
      if (values.password.length >= 8) {
        setValidPwd(true);
        setPwdErrorMessage('');
      } else {
        setValidPwd(false);
        setPwdErrorMessage(
          '알파벳 소문자, 대문자, 숫자 포함, 특수문자를 포함한 8-15자 사이의 비밀번호를 입력해주세요.'
        );
      }
      const match = values.password === values.checkPassword; // 비밀번호와 비밀번호 값 비교
      setMatchPwd(match); // 상태 값 변경 : false -> true
      if (match) {
        setPwdMatchErrorMessage('');
      } else {
        setPwdMatchErrorMessage('비밀번호가 일치하지 않습니다.');
      }
    }
  }, [values.password, values.checkPassword]);

  // Border Focus
  const [focusBorder, setFocusBorder] = useState({
    nicknameBorder: false,
    emailBorder: false,
    checkCodeBorder: false,
    passwordBorder: false,
    checkPasswordBorder: false,
  });

  const {
    nicknameBorder,
    emailBorder,
    checkCodeBorder,
    passwordBorder,
    checkPasswordBorder,
  } = focusBorder;

  const onFocusBorder = (border) => {
    setFocusBorder({
      ...focusBorder,
      [border]: !focusBorder[border],
    });
  };

  const onBlurBorder = (border) => {
    setFocusBorder({
      ...focusBorder,
      [border]: false,
    });
  };

  return (
    <Container
      display="flex"
      flexdirection="column"
      justifycontent="center"
      alignitems="center"
      gap="12px"
    >
      <StRegisterSection>
        <StRegisterBox>
          <StHeader>
            <h1>회원가입</h1>
          </StHeader>

          {/* 회원가입 영역 */}
          <StForm onSubmit={onSubmitHandler}>
            {/* 닉네임 영역 */}
            <NicknameInput
              name="nickname"
              value={values.nickname}
              onChange={onChangeHandler}
              placeholder="닉네임"
              inputwidth="193px"
              validNickname={validNickname}
              button="확인"
              bordercolor={
                nicknameBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
              }
              onFocus={() => onFocusBorder('nicknameBorder')}
              onBlur={() => onBlurBorder('nicknameBorder')}
              onClick={(e) => validateNicknameHandler(e)}
              successMessage={nicknameSuccessMessage}
              errorMessage={nicknameErrorMessage}
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
                inputwidth="193px"
                validEmail={validEmail}
                bordercolor={emailBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'}
                onFocus={() => onFocusBorder('emailBorder')}
                onBlur={() => onBlurBorder('emailBorder')}
                onClick={(e) => validateEmailHandler(e)}
                button="발송"
                emailVerification={emailVerification}
                successMessage={emailSuccessMessage}
                errorMessage={emailErrorMessage}
              />

              {/* 2. 인증번호 */}
              <EmailInput
                name="checkCode"
                value={values.checkCode}
                onChange={onChangeHandler}
                label="인증번호"
                placeholder="1234"
                inputwidth="85px"
                bordercolor={
                  checkCodeBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
                }
                onFocus={() => onFocusBorder('checkCodeBorder')}
                onBlur={() => onBlurBorder('checkCodeBorder')}
                onClick={(e) => verificateCodeHandler(e)}
                button="확인"
                inputboxwidth="255px"
                divwith="227px"
                validCode={validCode}
                successMessage={emailCodeSuccessMessage}
                errorMessage={emailCodeErrorMessage}
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
                placeholder="비밀번호"
                inputwidth="243px"
                bordercolor={
                  passwordBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
                }
                onFocus={() => onFocusBorder('passwordBorder')}
                onBlur={() => onBlurBorder('passwordBorder')}
                inputboxheight="105px"
                messageheight="57px"
                messagewidth="335px"
                icon={alertIcon}
                validPwd={validPwd}
                errorMessage={pwdErrorMessage}
              />

              {/* 2. 비밀번호 확인 */}
              <PasswordInput
                name="checkPassword"
                value={values.checkPassword}
                onChange={onChangeHandler}
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                inputwidth="243px"
                bordercolor={
                  checkPasswordBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
                }
                onFocus={() => onFocusBorder('checkPasswordBorder')}
                onBlur={() => onBlurBorder('checkPasswordBorder')}
                inputboxheight="82px"
                matchPwd={matchPwd}
                errorMessage={pwdMatchErrorMessage}
              />
            </StInputField>

            {/* 약관 및 회원가입 버튼 영역 */}
            <StPolicyField>
              <StCheckboxInputField>
                <CheckboxInput
                  label="서비스 약관에 동의합니다."
                  id="terms"
                  htmlFor="terms"
                />
                <CheckboxInput
                  label="개인정보 수집 및 이용에 동의합니다."
                  id="personal"
                  htmlFor="personal"
                />
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
            <KakaoButton to={KAKAO_AUTH_URL} />
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
