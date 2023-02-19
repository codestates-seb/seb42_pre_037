import {useEffect} from 'react';
import axios from 'axios';

import Button from './Components/Ui/Button';
import SearchBar from './Components/Ui/SearchBar';
import Login from './Pages/Login';

import { useIsLoginStore } from './Stores/loginStore';
import { useUserInfoStore } from './Stores/userInfoStore';

function App() {
  const {isLogin, setIsLogin} = useIsLoginStore((state)=>state);
  const {userInfo, setUserInfo} = useUserInfoStore((state)=>state);

  console.log(isLogin);

  const initInfo = {
    email: "abc111@naver.com",
    name: "홍길동",
  }
  
  if(Object.keys(userInfo).length === 0){
    setUserInfo(initInfo);
  }

  console.log(userInfo);

  const authHandler = () => {
    axios
      .get('https://localhost:4000/userinfo')
      .then((res) => {
        setIsLogin(true);
        setUserInfo(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(err.response.data);
        }
      });
  };

  useEffect(() => {
    authHandler();
  }, []);

  return (
    <div>
      <Login />
      <div className="m-5 space-x-2">
        <Button color="gray" size="large" type="button">
          버튼입니다!
        </Button>
        <Button color="blue" size="medium" type="button">
          버튼입니다!
        </Button>
        <Button color="green" size="small" type="button">
          버튼입니다!
        </Button>
      </div>
      <div className="m-5 flex flex-col mt-2 space-y-2 w-96">
        <SearchBar placeholder="Filter by tag name..." />
        <SearchBar placeholder="Search..." />
      </div>
    </div>
  );
}

export default App;
