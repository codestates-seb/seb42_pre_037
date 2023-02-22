import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import Questions from './Pages/Questions';
import Question from './Pages/Question';
import QuestionForm from './Pages/QuestionForm';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Test from './Pages/Test';

// import Mainlayout from './Components/layouts/Mainlayout';

import { useIsLoginStore } from './Stores/loginStore';
import { useUserInfoStore } from './Stores/userInfoStore';
import Logout from './Pages/Logout';

function App() {
  const { setIsLogin } = useIsLoginStore(state => state);
  const { userInfo, setUserInfo } = useUserInfoStore(state => state);

  console.log(userInfo);
  const authHandler = () => {
    console.log(localStorage.getItem('token'));

    axios
      .post(
        'http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/members/userInfo',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            withCredentials: true,
          },
        },
      )
      .then(res => {
        setIsLogin(true);
        setUserInfo(res.data);
        console.log('success: ', res.data);
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  useEffect(() => {
    authHandler();
  }, []);

  return (
    <BrowserRouter>
      {/* <Mainlayout /> */}
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="question" element={<Question />} />
        <Route path="questionForm" element={<QuestionForm />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="logout" element={<Logout />} />
        <Route path="test" element={<Test />} />
        <Route path="question/ask" element={<QuestionForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
