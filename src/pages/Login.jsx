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
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'success',
          iconColor: '#00573f',
          text: responseMessage,
          width: 400,
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/main');
          }
        });
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
        Swal.fire({
          icon: 'info',
          iconColor: '#00573f',
          text: errorMessage,
          width: 400,
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
      }
      if (statusCode === 404 && errorMessage === '해당 유저 정보를 찾을 수 없습니다') {
        Swal.fire({
          icon: 'error',
          iconColor: '#00573f',
          text: errorMessage,
          width: 400,
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
      }
      if (statusCode === 400 && errorMessage === '카카오 아이디가 존재합니다.') {
        Swal.fire({
          icon: 'info',
          iconColor: '#00573f',
          text: `${errorMessage} 카카오로 로그인해 주세요.`,
          width: 400,
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
      }
    },
  });

  const onSubitLoginHandler = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      if (!values.email) {
        Swal.fire({
          icon: 'info',
          iconColor: '#00573f',
          text: '이메일을 입력해주세요',
          width: 400,
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
      } else {
        Swal.fire({
          icon: 'info',
          iconColor: '#00573f',
          text: '비밀번호를 입력해주세요',
          width: 400,
          confirmButtonColor: '#00573f',
          confirmButtonText: '확인',
        });
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
      Swal.fire({
        icon: 'info',
        iconColor: '#00573f',
        text: '이미 로그인되어 있습니다',
        width: 400,
        confirmButtonColor: '#00573f',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/main');
        }
      });
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
