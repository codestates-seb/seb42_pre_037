import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import Questions from './Pages/Questions';
import Question from './Pages/Question';
import QuestionForm from './Pages/QuestionForm';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Test from './Pages/Test';

import { useIsLoginStore } from './Stores/loginStore';
import { useUserInfoStore } from './Stores/userInfoStore';

function App() {
  const { isLogin, setIsLogin } = useIsLoginStore(state => state);
  const { userInfo, setUserInfo } = useUserInfoStore(state => state);

  console.log(isLogin);

  const initInfo = {
    email: 'abc111@naver.com',
    name: '홍길동',
  };

  if (Object.keys(userInfo).length === 0) {
    setUserInfo(initInfo);
  }

  console.log(userInfo);

  const authHandler = () => {
    axios
      .get('https://localhost:4000/userinfo')
      .then(res => {
        setIsLogin(true);
        setUserInfo(res.data);
      })
      .catch(err => {
        if (err.response.status === 401) {
          console.log(err.response.data);
        }
      });
  };

  useEffect(() => {
    authHandler();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="question" element={<Question />} />
        <Route path="questionForm" element={<QuestionForm />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="test" element={<Test />} />
        <Route path='questions/ask' element={<QuestionForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
