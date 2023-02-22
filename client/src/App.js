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
import Header from './Components/layouts/Header';
// import Navbar from './Components/layouts/Navbar';

import { useIsLoginStore } from './Stores/loginStore';
import { useUserInfoStore } from './Stores/userInfoStore';

function App() {
  const { setIsLogin } = useIsLoginStore(state => state);
  const { userInfo, setUserInfo } = useUserInfoStore(state => state);

  const authHandler = () => {
    console.log(localStorage.getItem('token'));
    axios
      .get('https://73f1-14-6-64-237.jp.ngrok.io/members/userInfo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        setIsLogin(true);
        setUserInfo(res.data);
        console.log('success: ', res.data);
        console.log(userInfo);
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
      <Header />
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="question" element={<Question />} />
        <Route path="questionForm" element={<QuestionForm />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="test" element={<Test />} />
        <Route path="question/ask" element={<QuestionForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
