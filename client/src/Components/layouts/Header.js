import { Link } from 'react-router-dom';
import Button from '../Ui/Button';
import HeaderLogo from '../icons/HeaderLogo.png';

function Header() {
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  shadow p-1">
        <div className="px-40 mx-2">
          <div className="flex items-center justify-between h-9 ">
            <div className=" flex items-center">
              <a className="flex-shrink-0" href="/">
                <img className="w-8 h-8" alt="Workflow" src={HeaderLogo}/>
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
            <div className="block">
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
    </div>
  );
}

export default Header;
