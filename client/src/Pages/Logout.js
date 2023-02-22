import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useIsLoginStore, useLoginInfoStore } from '../Stores/loginStore';
import { useUserInfoStore } from '../Stores/userInfoStore';
import Button from '../Components/Ui/Button';

const Logout = () => {
  const { setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);
  const { setLoginInfo } = useLoginInfoStore(state => state);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log('logout');

    axios
      .get(
        'http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/members/logout',
      )
      .then(res => {
        setIsLogin(false);
        localStorage.removeItem('token');
        setUserInfo({});
        setLoginInfo({});
        console.log(res.data);
        navigate('/');
      })
      .catch(err => {
        if (err.response.status === 401) {
          setErrorMessage('로그아웃에 실패했습니다.');
          console.log(errorMessage);
        }
      });
  };

  return (
    <div>
      <Button onClick={() => logoutHandler()}>LogOut</Button>
    </div>
  );
};

export default Logout;
