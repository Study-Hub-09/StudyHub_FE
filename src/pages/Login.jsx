import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { login } from '../core/api/auth/login';
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
    onSuccess: (response) => {
      const {
        status: statusCode,
        data: { message: responseMessage },
      } = response;

      if (statusCode === 200 && responseMessage === '로그인 성공') {
        alert(responseMessage);
        navigate('/');
      }
    },
    onError: (error) => {
      const {
        response: {
          status: statusCode,
          data: { message: errorMessage },
        },
      } = error;
      if (statusCode === 400 && errorMessage === '비밀번호를 다시 입력해주세요.') {
        alert(errorMessage);
      }
      if (statusCode === 404 && errorMessage === '해당 유저 정보를 찾을 수 없습니다') {
        alert(errorMessage);
      }
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
      loginMutation.mutate({
        email: values.email,
        password: values.password,
      });
    }
  };

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    if (accessToken) {
      alert('이미 로그인되어 있습니다.');
      navigate('/main');
    }
  }, []);

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
