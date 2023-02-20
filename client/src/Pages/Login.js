import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useIsLoginStore, useLoginInfoStore } from '../Stores/loginStore';
import { useUserInfoStore } from '../Stores/userInfoStore';

import iconStack from '../icons/icon_stack.png';
import Card from '../Components/Ui/Card';
import Input from '../Components/Ui/Input';
import Button from '../Components/Ui/Button';

const Login = () => {
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useLoginInfoStore(state => state);
  const { setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);
  const [setCheckedKeepLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Input 정보 처리
  const handleInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // 로그인 요청 처리
  const loginRequestHandler = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
      return;
    }

    setErrorMessage('');

    axios
      .post('https://localhost:4000/login', { loginInfo })
      .then(res => {
        setIsLogin(true);
        setUserInfo(res.data);
        // data 확인
        console.log(res.data);
        // local storage에 token 저장
        localStorage.setItem('token', res.data.jwt);
        // 로그인 성공시 홈페이지 이동
        navigate('/');
      })
      .catch(err => {
        if (err.response.status === 401) {
          setErrorMessage('로그인에 실패했습니다.');
        }
      });

    // 중복 로그인 해결
    useEffect(() => {
      if (localStorage.getItem('token')) {
        navigate('/');
      }
    }, []);

    // 오류 해결 코드
    setCheckedKeepLogin(false);
    if (errorMessage !== '') {
      console.log('aaa');
    }
  };

  return (
    <div className="content justify-center items-center flex flex-col bg-gray-200">
      <div className="">
        <img
          className="object-scale-down w-14 h-16"
          src={iconStack}
          alt="icon_stack"
        />
      </div>
      <div>this is Login page</div>
      <Card className="formContainer bg-white shadow-md rounded p-6 mb-6 mx-auto">
        <form className="loginForm">
          <Input
            label="Email"
            id="emailInput"
            onChange={handleInputValue('email')}
          />
          <div className="password-set mb-6">
            <div className="password-label-set flex flex-row justify-between">
              <label
                className="password-label block text-left text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordInput"
              >
                Password
              </label>
              <Link
                className="inline-block items-end font-light text-sm text-blue-500 hover:text-blue-800"
                to="https://www.naver.com"
              >
                Forgot Password?
              </Link>
            </div>
            <div>
              <input
                className="password-input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="passwordInput"
                type="password"
                onChange={handleInputValue('password')}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="login-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                loginRequestHandler();
                console.log(loginInfo);
              }}
            >
              Log in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
