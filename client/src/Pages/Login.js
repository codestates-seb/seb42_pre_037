import React, { useState } from 'react';
import axios from 'axios';
import { useIsLoginStore, useLoginInfoStore } from '../Stores/loginStore';
import { useUserInfoStore } from '../Stores/userInfoStore';

import iconStack from '../icons/icon_stack.png';

const Login = () => {
  const { loginInfo, setLoginInfo } = useLoginInfoStore(state => state);
  const { setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);
  const [checkedKeepLogin, setCheckedKeepLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const loginRequestHandler = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
      return;
    }

    setErrorMessage('');

    axios
      .post('https://localhost:4000/login', { loginInfo, checkedKeepLogin })
      .then(res => {
        setIsLogin(true);
        setUserInfo(res.data);
      })
      .catch(err => {
        if (err.response.status === 401) {
          setErrorMessage('로그인에 실패했습니다.');
        }
      });

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
      <div className="formContainer bg-white shadow-md rounded p-6 mb-6 mx-auto">
        <form className="login-form">
          <div className="email-set mb-4">
            <label
              className="email-label block text-left text-gray-700 text-sm font-bold mb-2"
              htmlFor="emailInput"
            >
              Email
            </label>
            <div>
              <input
                className="email-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="emailInput"
                type="text"
                onChange={handleInputValue('email')}
                required
              />
            </div>
          </div>
          <div className="password-set mb-6">
            <div className="password-label-set flex flex-row justify-between">
              <label
                className="password-label block text-left text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordInput"
              >
                Password
              </label>
              <a
                className="inline-block items-end font-light text-sm text-blue-500 hover:text-blue-800"
                href="https://www.naver.com"
              >
                Forgot Password?
              </a>
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
            <button
              className="login-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                loginRequestHandler();
                console.log(loginInfo);
              }}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
