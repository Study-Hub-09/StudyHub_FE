import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Container from '../components/Container/Container';
import Button from '../components/Buttons/Button';
import NicknameInput from '../components/Inputs/NicknameInput';
import EmailInput from '../components/Inputs/EmailInput';
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
import { register, validateEmail, validateNickname } from '../core/api/auth/register';
import { KAKAO_AUTH_URL } from '../core/api/auth/OAuth';

function Register() {
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState('');

  const [verificationStatus, setVerificationStatus] = useState({
    isNicknameVerified: false,
    isEmailVerified: false,
    isEmailCodeVerified: false,
  });

  const [values, setValues] = useState({
    nickname: '',
    email: '',
    checkCode: '',
    password: '',
    checkPassword: '',
  });

  const [validations, setValidations] = useState({
    validEmailCode: false,
    validPwd: false,
    matchPwd: false,
    validNickname: false,
    validEmail: false,
  });

  const [messages, setMessages] = useState({
    nicknameSuccessMessage: '',
    nicknameErrorMessage: '',
    emailSuccessMessage: '',
    emailErrorMessage: '',
    emailCodeSuccessMessage: '',
    emailCodeErrorMessage: '',
    pwdErrorMessage: '',
    pwdMatchErrorMessage: '',
  });

  const [inputFocusBorder, setInputFocusBorder] = useState({
    nicknameBorder: false,
    emailBorder: false,
    checkCodeBorder: false,
    passwordBorder: false,
    checkPasswordBorder: false,
  });

  const { nickname, email, checkCode, password, checkPassword } = values;
  const { validEmailCode, validPwd, matchPwd, validNickname, validEmail } = validations;
  const { isNicknameVerified, isEmailVerified, isEmailCodeVerified } = verificationStatus;

  const {
    nicknameSuccessMessage,
    nicknameErrorMessage,
    emailSuccessMessage,
    emailErrorMessage,
    emailCodeSuccessMessage,
    emailCodeErrorMessage,
    pwdErrorMessage,
    pwdMatchErrorMessage,
  } = messages;

  const {
    nicknameBorder,
    emailBorder,
    checkCodeBorder,
    passwordBorder,
    checkPasswordBorder,
  } = inputFocusBorder;

  // Input onChange 핸들러
  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // 회원가입 폼 버튼 핸들러
  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    if (
      nickname === '' ||
      email === '' ||
      checkCode === '' ||
      password === '' ||
      checkPassword === ''
    )
      return alert('모든 칸을 입력해주세요.');

    if (!isNicknameVerified) return alert('닉네임 중복 확인해주세요.');
    if (!isEmailVerified) return alert('이메일 발송 확인해주세요.');
    if (!isEmailCodeVerified) return alert('이메일 인증코드를 확인해주세요.');
    else {
      registerMutation.mutate({
        nickname,
        email,
        password,
        checkPassword,
      });
    }
  };

  // 이메일 확인 버튼 핸들러
  const validateEmailHandler = (e) => {
    e.preventDefault();
    if (!email) {
      alert('이메일을 입력해주세요');
    } else {
      validateEmailMutation.mutate({
        email,
      });
    }
  };

  // 중복 닉네임 확인 버튼 핸들러
  const validateNicknameHandler = (e) => {
    e.preventDefault();
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
    } else {
      validateNickNameMutation.mutate({
        nickname,
      });
    }
  };

  // 이메일 인증번호 확인 버튼 핸들러
  const verificateEmailCodeHandler = (e) => {
    e.preventDefault();
    if (!checkCode) alert('인증번호를 입력해주세요');
    if (checkCode === verificationCode) {
      setValidations((prevValidations) => ({
        ...prevValidations,
        validEmailCode: true,
      }));
    } else {
      setValidations((prevValidations) => ({
        ...prevValidations,
        validEmailCode: false,
      }));
    }
  };

  // 입력 필드의 포커스 상태를 업데이트하는 함수
  const onFocusInputBorder = (border) => {
    setInputFocusBorder({
      ...inputFocusBorder,
      [border]: !inputFocusBorder[border],
    });
  };

  // 입력 필드의 포커스가 해제될 때 경계를 초기화하는 함수
  const onBlurInputBorder = (border) => {
    setInputFocusBorder({
      ...inputFocusBorder,
      [border]: false,
    });
  };

  // 회원가입 뮤테이션 훅
  const registerMutation = useMutation(register, {
    async onSuccess(response) {
      console.log(response.data.message);
      const statusCode = response.status;
      if (statusCode === 200) {
        alert('회원가입 성공!');
        navigate('/members/login');
      }
    },
    async onError(error) {
      console.log('Register.jsx ERROR=====> ', error);
    },
  });

  // 중복 닉네임 확인 뮤테이션 훅
  const validateNickNameMutation = useMutation(validateNickname, {
    async onSuccess(response) {
      const duplicateNickname = response.data.data;
      if (duplicateNickname) {
        setVerificationStatus((prevVerifications) => ({
          ...prevVerifications,
          isNicknameVerified: true,
        }));
        setMessages((prevMessages) => ({
          ...prevMessages,
          nicknameSuccessMessage: '닉네임 중복 확인되었습니다.',
        }));
      } else if (!duplicateNickname) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          nicknameErrorMessage: '중복된 닉네임입니다.',
        }));
        setValidations((prevValidations) => ({
          ...prevValidations,
          validNickname: false,
        }));
      }
    },
    async onError(error) {
      console.log(error);
    },
  });

  // 이메일 중복 확인 뮤테이션 훅
  const validateEmailMutation = useMutation(validateEmail, {
    async onSuccess(response) {
      const { data: verificationCode } = response;
      setVerificationStatus((prevVerifications) => ({
        ...prevVerifications,
        isEmailVerified: true,
      }));
      setMessages((prevMessages) => ({
        ...prevMessages,
        emailSuccessMessage: '이메일이 발송되었습니다.',
      }));
      setVerificationCode(verificationCode);
    },
    async onError(error) {
      const statusCode = error.response.data.statusCode;

      if (statusCode === 400) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          emailErrorMessage: '이미 회원가입된 이메일입니다.',
        }));
        setValidations((prevValidations) => ({
          ...prevValidations,
          validEmail: false,
        }));
      }
    },
  });

  // 닉네임 유효성 검사
  useEffect(() => {
    if (nickname) {
      const NICKNAME_REGEX = /^[a-zA-Z가-힣]{2,10}$/;
      const isValidNickname = NICKNAME_REGEX.test(nickname);

      setValidations((prevValidations) => ({
        ...prevValidations,
        validNickname: isValidNickname,
      }));

      if (isValidNickname && nickname.length >= 2) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          nicknameSuccessMessage: '사용 가능한 닉네임입니다.',
          nicknameErrorMessage: '',
        }));
      } else {
        setMessages((prevMessages) => ({
          ...prevMessages,
          nicknameSuccessMessage: '',
          nicknameErrorMessage: '한글 또는 영문 대소문자 2-10자 닉네임을 입력해주세요.',
        }));
      }
    } else {
      setMessages((prevMessages) => ({
        ...prevMessages,
        nicknameSuccessMessage: '',
        nicknameErrorMessage: '',
      }));
    }
  }, [nickname]);

  // 이메일 유효성 검사
  useEffect(() => {
    if (email) {
      const EMAIL_REGEX = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const isValidEmail = EMAIL_REGEX.test(email);
      setValidations((prevValidations) => ({
        ...prevValidations,
        validEmail: isValidEmail,
      }));
      if (isValidEmail) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          emailSuccessMessage: '사용가능한 이메일입니다.',
          emailErrorMessage: '',
        }));
      } else {
        setMessages((prevMessages) => ({
          ...prevMessages,
          emailSuccessMessage: '',
          emailErrorMessage: '잘못된 이메일 형식입니다.',
        }));
      }
    } else {
      setMessages((prevMessages) => ({
        ...prevMessages,
        emailSuccessMessage: '',
        emailErrorMessage: '',
      }));
    }
  }, [email]);

  // 이메일 인증 발송 버튼 클릭시 이메일 인증확인
  useEffect(() => {
    if (validEmailCode) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        emailCodeSuccessMessage: '이메일 인증이 완료 되었습니다.',
        emailCodeErrorMessage: '',
      }));
      setValidations((prevValidations) => ({
        ...prevValidations,
        isEmailCodeVerified: true,
      }));
    } else {
      setMessages((prevMessages) => ({
        ...prevMessages,
        emailCodeSuccessMessage: '',
        emailCodeErrorMessage: '올바른 인증 코드를 입력해주세요.',
      }));
    }
  }, [validEmailCode]);

  // 비밀번호 유효성 검사 및 동일한 비밀번호 입력 확인
  useEffect(() => {
    if (password) {
      const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?=\S+$).{8,15}$/;
      const isValidPassword = PWD_REGEX.test(password);
      const matchPassword = password === checkPassword;

      setValidations((prevValidations) => ({
        ...prevValidations,
        validPwd: isValidPassword,
        matchPwd: matchPassword,
      }));

      if (isValidPassword && matchPassword) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          pwdErrorMessage: '',
          pwdMatchErrorMessage: '',
        }));
      } else {
        if (!isValidPassword || !matchPassword) {
          setMessages((prevMessages) => ({
            ...prevMessages,
            pwdErrorMessage:
              '알파벳 소문자, 대문자, 숫자, 특수문자를 포함한 8-15자 사이의 비밀번호를 입력해주세요.',
            pwdMatchErrorMessage: '비밀번호가 일치하지 않습니다.',
          }));
        } else {
          setMessages((prevMessages) => ({
            ...prevMessages,
            pwdErrorMessage: '',
            pwdMatchErrorMessage: '',
          }));
        }
      }
    }
  }, [password, checkPassword]);

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
          <StForm onSubmit={onSubmitFormHandler}>
            {/* 닉네임 영역 */}
            <NicknameInput
              name="nickname"
              value={nickname}
              onChange={onChangeInputHandler}
              placeholder="닉네임"
              inputwidth="193px"
              validNickname={validNickname}
              button="확인"
              bordercolor={
                nicknameBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
              }
              onFocus={() => onFocusInputBorder('nicknameBorder')}
              onBlur={() => onBlurInputBorder('nicknameBorder')}
              onClick={(e) => validateNicknameHandler(e)}
              successMessage={nicknameSuccessMessage}
              errorMessage={nicknameErrorMessage}
            />

            {/* 이메일 영역 */}
            <StInputField>
              {/* 1. 이메일 주소 */}
              <EmailInput
                name="email"
                value={email}
                onChange={onChangeInputHandler}
                label="이메일 주소"
                placeholder="이메일 주소"
                inputwidth="193px"
                validEmail={validEmail}
                bordercolor={emailBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'}
                onFocus={() => onFocusInputBorder('emailBorder')}
                onBlur={() => onBlurInputBorder('emailBorder')}
                onClick={(e) => validateEmailHandler(e)}
                button="발송"
                isEmailVerified={isEmailVerified}
                successMessage={emailSuccessMessage}
                errorMessage={emailErrorMessage}
              />

              {/* 2. 인증번호 */}
              <EmailInput
                name="checkCode"
                value={checkCode}
                onChange={onChangeInputHandler}
                label="인증번호"
                placeholder="1234"
                inputwidth="85px"
                bordercolor={
                  checkCodeBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
                }
                onFocus={() => onFocusInputBorder('checkCodeBorder')}
                onBlur={() => onBlurInputBorder('checkCodeBorder')}
                onClick={(e) => verificateEmailCodeHandler(e)}
                button="확인"
                inputboxwidth="255px"
                divwith="227px"
                validCode={validEmailCode}
                successMessage={emailCodeSuccessMessage}
                errorMessage={emailCodeErrorMessage}
              />
            </StInputField>

            {/* 비밀번호 영역 */}
            <StInputField>
              {/* 1. 비밀번호 */}
              <PasswordInput
                name="password"
                value={password}
                onChange={onChangeInputHandler}
                label="비밀번호"
                placeholder="비밀번호"
                inputwidth="243px"
                bordercolor={
                  passwordBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
                }
                onFocus={() => onFocusInputBorder('passwordBorder')}
                onBlur={() => onBlurInputBorder('passwordBorder')}
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
                value={checkPassword}
                onChange={onChangeInputHandler}
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                inputwidth="243px"
                bordercolor={
                  checkPasswordBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
                }
                onFocus={() => onFocusInputBorder('checkPasswordBorder')}
                onBlur={() => onBlurInputBorder('checkPasswordBorder')}
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
