import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { login } from '../core/api/auth/login';
import { setCookie } from '../Cookies/Cookies';
import { getCookie } from '../Cookies/Cookies';
import { Link, useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../core/api/auth/OAuth';
import Container from '../components/Container/Container';
import {
  StForm,
  StHeader,
  StLoginBox,
  StLoginFooter,
  StLoginSection,
  StSocialField,
  StLoginInputFrame,
} from '../styles/Login.styles';
import Button from '../components/Buttons/Button';
import KakaoButton from '../components/Buttons/KakaoButton';
import Input from '../components/Inputs/Input';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [focusBorder, setFocusBorder] = useState({
    emailBorder: false,
    passwordBorder: false,
  });

  const { emailBorder, passwordBorder } = focusBorder;

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

  const loginMutation = useMutation(login, {
    async onSuccess(response) {
      console.log('RESPONSE LOGIN.JSX LINE19 =====> ', response);
      const statusCode = response.status;
      const responseMessage = response.data.message;
      const accessToken = response.headers.get('access_token').split(' ')[1];
      const refreshToken = response.headers.get('refresh_token').split(' ')[1];
      const nickname = response.data.data;
      setCookie('AccessToken', accessToken, { path: '/' });
      setCookie('RefreshToken', refreshToken, { path: '/' });
      localStorage.setItem('member', nickname);

      if (statusCode === 200) {
        alert(responseMessage);
        navigate('/');
      }
    },
    async onError(error) {
      console.log(error);
      const statusCode = error.response.status;
      const message = error.response.data.message;
      if (statusCode === 400) {
        alert(message);
      }
      if (statusCode === 404) {
        alert(message); //해당 유저 정보를 찾을 수 없습니다 -> 서버에서 응답하는 메세지
        // 유효하지 않은 로그인 정보입니다
      }
      console.log('onError Login.jsx===> ', statusCode);
    },
  });

  const onSubitLoginHandler = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      if (!values.email) {
        alert('이메일을 입력해주세요');
      } else {
        alert('비밀번호를 입력해주세요');
      }
    } else {
      const accessToken = getCookie('AccessToken');
      if (accessToken) {
        alert('이미 로그인되어 있습니다.');
        navigate('/main');
      } else {
        loginMutation.mutate({
          email: values.email,
          password: values.password,
        });
      }
    }
  };

  return (
    <Container
      display="flex"
      flexdirection="column"
      justifycontent="center"
      alignitems="center"
      gap="12px"
    >
      <StLoginSection>
        <StLoginBox>
          <StHeader>
            <h1>로그인</h1>
          </StHeader>
          <StForm onSubmit={onSubitLoginHandler}>
            <StLoginInputFrame>
              <Input
                type="text"
                label="이메일"
                placeholder="이메일 주소"
                name="email"
                value={values.email}
                onChange={onChangeHandler}
                bordercolor={emailBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'}
                onFocus={() => onFocusBorder('emailBorder')}
                onBlur={() => onBlurBorder('emailBorder')}
              />
              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호"
                name="password"
                value={values.password}
                onChange={onChangeHandler}
                bordercolor={
                  passwordBorder ? 'var(--color-dark-gray)' : 'var(--color-gray)'
                }
                onFocus={() => onFocusBorder('passwordBorder')}
                onBlur={() => onBlurBorder('passwordBorder')}
              />
            </StLoginInputFrame>
            <Button
              width="142px"
              height="48px"
              borderradius="30px"
              border="var(--color-gray)"
            >
              로그인
            </Button>
          </StForm>
          <StSocialField>
            <p>SNS 계정으로 시작하기</p>
            <KakaoButton to={KAKAO_AUTH_URL} />
          </StSocialField>
        </StLoginBox>
      </StLoginSection>

      <StLoginFooter>
        <p>아직 회원이 아니신가요?</p>
        <Link to="/members/register">회원가입</Link>
      </StLoginFooter>
    </Container>
  );
}

export default Login;
