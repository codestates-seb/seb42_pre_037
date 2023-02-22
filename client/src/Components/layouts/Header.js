import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../Ui/Button';
import HeaderLogo from '../icons/HeaderLogo.png';
import SearchBar from '../Ui/SearchBar';

function Header() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  shadow p-2 ">
        <div className="px-40 items-center ">
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
                  About
                </a>
                <a
                  className="text-gray-500  hover:bg-gray-200  hover:text-gray-800 dark:hover:text-white px-2 py-1 rounded-3xl text-sm font-medium"
                  href="/#"
                >
                  Products
                </a>
                <a
                  className="text-gray-500  hover:bg-gray-200 hover:text-gray-800 dark:hover:text-white px-2 py-1 rounded-3xl text-sm font-medium"
                  href="/#"
                >
                  For Teams
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
                <Link to="/login">
                  <Button color="clear-blue">Log in</Button>
                </Link>
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                    <Link to="/signup">
                      <Button>Sign up</Button>
                    </Link>
                  </div>
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

export default Header;
