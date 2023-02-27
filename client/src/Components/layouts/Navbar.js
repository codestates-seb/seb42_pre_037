import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ImEarth } from 'react-icons/im';

function Navbar() {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  return (
    <div className="sticky max-h-[calc(100vh-180px)] top-[60px] border-r border-solid border-gray-300 bg-white  ">
      <ul className="relative ">
        <li className="relative">
          <Link
            to="/"
            className="flex items-center text-sm py-7 pr-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 transition duration-300 ease-in-out"
          >
            <span>Home</span>
          </Link>
        </li>
        <li className="relative">
          <p className="flex items-center text-xs py-1 pr-6 h-5 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 transition duration-300 ease-in-out">
            <span>PUBLIC</span>
          </p>
        </li>
        <li
          className={`${
            path === '' || path === 'question'
              ? ' bg-gray-200 border-r-4 border-solid border-orange-400 font-semibold pr-20'
              : ''
          } relative`}
        >
          <Link
            to="/"
            className="flex items-center text-sm  pl-4 h-10 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out"
          >
            <ImEarth className="w-5 h-5 mr-2 " />

            <span>Questions</span>
          </Link>
        </li>
        <li className="relative">
          <p className="flex items-center text-sm  h-10 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out">
            <svg className="w-4 h-3 mr-8" />
            <span>Tags</span>
          </p>
        </li>
        <li className="relative">
          <p className="flex items-center text-sm  h-10 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out">
            <svg className="w-4 h-3 mr-8" />
            <span>Users</span>
          </p>
        </li>
        <li className="relative">
          <p className="flex items-center text-sm  h-10 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out">
            <svg className="w-4 h-3 mr-8" />
            <span>Companies</span>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
