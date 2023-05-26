import React, { useState } from 'react';
import Container from '../components/Container/Container';
import {
  StRegisterForm,
  StRegisterContainer,
  StInputField,
  StSocialField,
  StRegisterBox,
  StRegisterHeader,
  StCheckboxInputField,
  StRegisterFormBox,
  StPolicyField,
  StFormFooter,
} from '../styles/Register.styles';
import InputForm from '../components/Inputs/InputForm';
import KakaoButton from '../components/Buttons/KakaoButton';
import CheckboxInputForm from '../components/Inputs/CheckboxInputForm';
import Button from '../components/Buttons/Button';
import SvgIcon from '../components/Icons/SvgIcon';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
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
      <StRegisterContainer>
        <StRegisterBox>
          {/* Register Header */}
          <StRegisterHeader>
            <h1>회원가입</h1>
          </StRegisterHeader>

          {/* Register Form */}
          <StRegisterFormBox>
            <StRegisterForm>
              {/* Nickname Input */}
              <InputForm
                label="닉네임"
                placeholder="이름"
                type="text"
                name="nickname"
                value={values.nickname}
                onChange={onChangeHandler}
              />

              {/* Email Input */}
              <StInputField>
                <InputForm
                  label="이메일 주소"
                  placeholder="이메일@주소.com"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={onChangeHandler}
                  button="인증"
                />
                <InputForm
                  label="인증번호"
                  placeholder="1234"
                  type="text"
                  name="checkCode"
                  value={values.checkCode}
                  onChange={onChangeHandler}
                  width="154px"
                  inputwidth="35px"
                  icon={
                    <SvgIcon
                      width={17}
                      height={16}
                      viewBox="0 0 17 16"
                      fill="#00573F"
                      path={
                        <>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.5 14C11.8137 14 14.5 11.3137 14.5 8C14.5 4.68629 11.8137 2 8.5 2C5.18629 2 2.5 4.68629 2.5 8C2.5 11.3137 5.18629 14 8.5 14ZM8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.0303 6.03033L7.5 11.5607L3.96967 8.03033L5.03033 6.96967L7.5 9.43934L11.9697 4.96967L13.0303 6.03033Z"
                          />
                        </>
                      }
                    />
                  }
                />
              </StInputField>

              {/* Password Input */}
              <StInputField>
                <InputForm
                  label="비밀번호"
                  placeholder="영문+숫자 8~16자리"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={onChangeHandler}
                  icon={
                    <SvgIcon
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      path={
                        <>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z"
                            fill="#9D9D9D"
                          />
                        </>
                      }
                    />
                  }
                />
                <InputForm
                  label="비밀번호 확인"
                  placeholder="비밀번호 확인"
                  type="password"
                  name="checkPassword"
                  value={values.checkPassword}
                  onChange={onChangeHandler}
                  icon={
                    <SvgIcon
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      path={
                        <>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z"
                            fill="#9D9D9D"
                          />
                        </>
                      }
                    />
                  }
                />
              </StInputField>

              {/* Policy and Register Button Field */}
              <StPolicyField>
                <StCheckboxInputField>
                  <CheckboxInputForm label="서비스 약관에 동의합니다." type="checkbox" />
                  <CheckboxInputForm
                    label="개인정보 수집 및 이용에 동의합니다."
                    type="checkbox"
                  />
                </StCheckboxInputField>
                <Button
                  border="var(--color-gray)"
                  width="156px"
                  height="48px"
                  padding="14px 50px"
                  borderradius="30px"
                >
                  회원가입
                </Button>
              </StPolicyField>
            </StRegisterForm>
          </StRegisterFormBox>

          {/* Register Social Login */}
          <StSocialField>
            <p>SNS 계정으로 시작하기</p>
            <KakaoButton />
          </StSocialField>
        </StRegisterBox>
      </StRegisterContainer>

      {/* If already the user have an account */}
      <StFormFooter>
        <p>
          계정이 있으신가요?
          <span onClick={() => navigate('/members/login')}>로그인</span>
        </p>
      </StFormFooter>
    </Container>
  );
}

export default Register;
