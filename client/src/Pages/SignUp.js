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
  const navigate = useNavigate();

  const register = () => {
    console.log({ username, email, password });
    axios
      .post('https://73f1-14-6-64-237.jp.ngrok.io/members/signup', {
        displayName: username,
        email,
        password,
        createdAt: '2023 02 20 01 53',
      })
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
