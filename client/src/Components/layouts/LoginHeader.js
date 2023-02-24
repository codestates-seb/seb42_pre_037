import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { GoInbox } from 'react-icons/go';
import { MdHelp } from 'react-icons/md';
import { CgBoy } from 'react-icons/cg';
import { ImTrophy } from 'react-icons/im';
import { RiLogoutBoxRLine } from 'react-icons/ri';

// import Button from '../Ui/Button';
import HeaderLogo from '../icons/HeaderLogo.png';
import SearchBar from '../Ui/SearchBar';

// import login, userInfo store
import { useIsLoginStore, useLoginInfoStore } from '../../Stores/loginStore';
import { useUserInfoStore } from '../../Stores/userInfoStore';

function LoginHeader() {
  const [toggle, setToggle] = useState(false);

  // LogOut handler
  const { setIsLogin } = useIsLoginStore(state => state);
  const { setUserInfo } = useUserInfoStore(state => state);
  const { setLoginInfo } = useLoginInfoStore(state => state);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const logoutHandler = () => {
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
    <div className="py-7 ">
      <nav className="bg-slate-50 dark:bg-gray-800 shadow p-2 border-t-4 border-solid border-orange-400 fixed z-40 top-0 left-0 right-0">
        <div className="px-44 items-center ">
          <div className="flex items-center h-10 ">
            <div className=" flex items-center">
              <a className="" href="/">
                <img className="w-56 h-10" alt="" src={HeaderLogo} />
              </a>
              <div className="flex items-baseline  space-x-4">
                <a
                  className="text-gray-500  hover:bg-gray-200  hover:text-gray-800 dark:hover:text-white px-2 py-1 rounded-3xl text-sm font-medium"
                  href="/#"
                >
                  Products
                </a>
              </div>
            </div>
            <button
              className="w-6/12 pl-4 py-1 "
              onClick={() => {
                setToggle(e => !e);
              }}
            >
              <SearchBar className="" placeholder="Search..." />
            </button>
            <div className="">
              <div className="flex items-center ml-4  ">
                <div className="mx-2 flex items-center">
                  <div className="text-3xl text-slate-600">
                    <CgBoy className="" />
                  </div>
                  <div>1</div>
                </div>
                <div className="text-3xl text-slate-600 ml-6 ">
                  <GoInbox />
                </div>
                <div className="text-3xl text-slate-600 ml-4">
                  <ImTrophy />
                </div>
                <div className="relative text-3xl text-slate-600 ml-4">
                  <MdHelp />
                </div>
                <div className="text-3xl text-slate-600 ml-4 cursor-pointer hover:bg-slate-300">
                  <RiLogoutBoxRLine
                    className=""
                    onClick={() => logoutHandler()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {toggle && (
        <div className="w-3/4 z-40 top-16  absolute ">
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2 absolute left-1/2 w-1/2 ">
            <div className="flex ">
              <div>
                <div className="mb-2">
                  <span className="text-xs font-medium">[ tag ]</span>
                  <span className="text-xs text-gray-600">
                    search within a tag
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-medium">user:1234</span>
                  <span className="text-xs text-gray-600">
                    search by author
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-medium">words here</span>
                  <span className="text-xs text-gray-600 ">exact phrase</span>
                </div>
                <div>
                  <span className="text-xs font-medium">collective:Name</span>
                  <span className="text-xs text-gray-600">
                    collective content
                  </span>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="text-xs font-medium">answers:0</span>
                  <span className="text-xs text-gray-600">
                    unansered questions
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-medium">score:3</span>
                  <span className="text-xs text-gray-600">
                    losts with a 3+ score
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-medium">is:question</span>
                  <span className="text-xs text-gray-600">type of post</span>
                </div>
                <div>
                  <span className="text-xs font-medium">isaccepted:yes</span>
                  <span className="text-xs text-gray-600">
                    search within status
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginHeader;
