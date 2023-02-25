import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

// import react-icons
import { HiChevronUpDown } from 'react-icons/hi2';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { IoPricetagsSharp } from 'react-icons/io5';
import { GiTrophy } from 'react-icons/gi';

// import Ui
import Card from '../Components/Ui/Card';
import Input from '../Components/Ui/Input';
import Button from '../Components/Ui/Button';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [recaptchaState, setRecaptchaState] = useState({ isVerified: false });

  const recaptchaOnChange = value => {
    console.log('Captcha value: ', value);
    setRecaptchaState({ isVerified: true });
  };

  // 유효성 검사 함수
  const isValidPassword = str => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return regex.test(str);
  };

  const isValidEmail = str => {
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    return regex.test(str);
  };

  const register = () => {
    if (!username || !email || !password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
      console.log(errorMessage);
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Email 형식에 맞게 입력해주세요');
      console.log(errorMessage);
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMessage(
        '최소 8글자, 문자 1개, 숫자 1개가 들어간 비밀번호를 입력해주세요',
      );
      return;
    }

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
        setErrorMessage('');
        navigate('/login');
      })
      .catch(err => {
        // Handle error.
        console.log('An error occurred:', err.response);
        if (err.response.status === 406) {
          setErrorMessage(err.response.data.message);
        } else {
          navigate('/404');
        }
      });
  };

  return (
    <div className="content flex flex-row stack-gray place-content-center h-screen items-center box-border">
      <div className=" mr-12">
        <h1 className="text-3xl mb-8">Join the Stack Overflow community</h1>
        <div className="">
          <div className="flex flex-row mb-6">
            <RiQuestionnaireLine className="mr-2 h-blue" />
            <div>Get unstuck — ask a question</div>
          </div>
          <div className="flex flex-row mb-6">
            <HiChevronUpDown className="mr-2 h-blue" />
            <div>Unlock new privileges like voting and commenting</div>
          </div>
          <div className="flex flex-row mb-6">
            <IoPricetagsSharp className="mr-2 h-blue" />
            <div>Save your favorite tags, filters, and jobs</div>
          </div>
          <div className="flex flex-row mb-6">
            <GiTrophy className="mr-2 h-blue" />
            <div>Earn reputation and badges</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Card className="formContainer max-w-xs">
          <form className="signupForm my-1.5">
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
              type="password"
              onChange={e => setPassword(e.target.value)}
            />

            <p className=" mb-4 font-medium text-xs">
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </p>
            <ReCAPTCHA
              className=" scale-90 mr-80 mb-4"
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={() => recaptchaOnChange()}
            />
            {errorMessage ? (
              <p className=" mb-4 font-medium text-xs text-red-600">
                {errorMessage}
              </p>
            ) : null}
            <Button
              color="blue"
              size="medium"
              type="button"
              disabled={!recaptchaState.isVerified}
              onClick={() => register()}
            >
              Sign up
            </Button>
          </form>
        </Card>
        <div className="linkPage text-center mt-6">
          Already have an account?
          <Link
            className="loginLink inline-block items-end font-light text-sm text-blue-500 hover:text-blue-800 ml-2"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
