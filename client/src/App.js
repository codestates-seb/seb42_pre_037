import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import Questions from './Pages/Questions';
import Question from './Pages/Question';
import QuestionForm from './Pages/QuestionForm';
import QuestionEdit from './Pages/QuestionEdit';
import AnswerEdit from './Pages/AnswerEdit';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Test from './Pages/Test';

// import Mainlayout from './Components/layouts/Mainlayout';
import Header from './Components/layouts/Header';
// import Navbar from './Components/layouts/Navbar';

import { useIsLoginStore } from './Stores/loginStore';
import { useUserInfoStore } from './Stores/userInfoStore';
import Logout from './Pages/Logout';
import ErrorPage from './Pages/ErrorPage';
import LoginHeader from './Components/layouts/LoginHeader';

function App() {
  const { isLogin, setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);

  const authHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/members/userInfo`,
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
        setUserInfo(res.data.data);
      })
      .catch(err => {
        if (err.response) {
          window.alert('error');
        }
      });
  };

  useEffect(() => {
    authHandler();
  }, []);

  return (
    <BrowserRouter>
      {/* <Mainlayout /> */}
      {isLogin ? <LoginHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="question/:questionId" element={<Question />} />
        <Route path="question/:questionId/edit" element={<QuestionEdit />} />
        <Route path="question/ask" element={<QuestionForm />} />
        <Route
          path="question/:questionId/:answerId/edit"
          element={<AnswerEdit />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="logout" element={<Logout />} />
        <Route path="test" element={<Test />} />
        <Route path="404" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
