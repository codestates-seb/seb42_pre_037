import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../Ui/Button';
import HeaderLogo from '../icons/HeaderLogo.png';
import SearchBar from '../Ui/SearchBar';

function Header() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  shadow p-1">
        <div className="px-40 mx-2">
          <div className="flex items-center justify-between h-9 ">
            <div className=" flex items-center">
              <a className="flex-shrink-0" href="/">
                <img className="w-40 h-10" alt="" src={HeaderLogo} />
              </a>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-2 space-x-4">
                  <a
                    className="text-gray-500  hover:bg-gray-200  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-3xl text-sm font-medium"
                    href="/#"
                  >
                    About
                  </a>
                  <a
                    className="text-gray-500  hover:bg-gray-200  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-3xl text-sm font-medium"
                    href="/#"
                  >
                    Products
                  </a>
                  <a
                    className="text-gray-500  hover:bg-gray-200 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-3xl text-sm font-medium"
                    href="/#"
                  >
                    For Teams
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setToggle(e => !e);
              }}
            >
              <SearchBar className="w-96" placeholder="Search..." />
            </button>
            <div className="">
              <div className="flex items-center ml-4 md:ml-6">
                <Link to="/login">
                  <Button>Log in</Button>
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
        <div>
          <div className="bg-white dark:bg-gray-900 w-fit shadow-lg rounded-lg p-2">
            <div className="flex items-center text-start ">
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
