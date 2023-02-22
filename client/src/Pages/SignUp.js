import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Card from '../Components/Ui/Card';
import Input from '../Components/Ui/Input';
import Button from '../Components/Ui/Button';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 유효성 검사 함수
  // const isValidPassword = str => {
  //   const regex = '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$';

  //   if (!regex.test(str)) {
  //     return false;
  //   }
  //   return true;
  // };

  // const isValidEmail = str => {
  //   const regex =
  //     '/([w-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/';

  //   if (!regex.test(str)) {
  //     return false;
  //   }
  //   return true;
  // };

  const register = () => {
    //
    if (!username || !email || !password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
      console.log(errorMessage);
      return;
    }
    // if (!isValidPassword(password)) {
    //   setErrorMessage(
    //     '최소 8글자, 문자 1개, 숫자 1개, 특수문자가 들어간 비밀번호를 입력해주세요',
    //   );
    //   console.log(errorMessage);
    //   return;
    // }
    // if (!isValidEmail(email)) {
    //   setErrorMessage('Email 형식에 맞게 입력해주세요');
    //   console.log(errorMessage);
    //   return;
    // }

    const date = new Date();
    const createdAt = date;
    console.log(createdAt);

    axios
      .post(
        'http://ec2-3-39-230-41.ap-northeast-2.compute.amazonaws.com:8080/members/signup',
        {
          displayName: username,
          email,
          password,
          createdAt,
        },
      )
      .then(res => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', res.data);
        navigate('/login');
      })
      .catch(err => {
        // Handle error.
        console.log('An error occurred:', err.response);
      });
  };

  return (
    <div className="content">
      <div>
        <h1>Join the Stack Overflow community</h1>
      </div>
      <Card className="formContainer">
        <form className="signupForm">
          <Input
            className="usernameInput"
            label="Display name"
            id="nameInput"
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            label="Email"
            id="emailInput"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            id="passwordInput"
            onChange={e => setPassword(e.target.value)}
          />
          <p>
            Passwords must contain at least eight characters, including at least
            1 letter and 1 number.
          </p>
          <Button
            color="blue"
            size="medium"
            type="button"
            onClick={() => register()}
          >
            Sign up
          </Button>
        </form>
      </Card>
      <div className="linkPage">
        Already have an account?
        <Link
          className="loginLink inline-block items-end font-light text-sm text-blue-500 hover:text-blue-800"
          to="/login"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
