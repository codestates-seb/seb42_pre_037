import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ImEarth } from 'react-icons/im';

function Navbar() {
  const location = useLocation(); // 현재url가져오기
  const path = location.pathname.split('/')[1];

  return (
    <div className="sticky top-0 h-screen pt-20 border-r bg-white ">
      <ul className="relative ">
        <li className="relative">
          <Link
            to="/"
            className="flex items-center text-sm py-10 pr-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 transition duration-300 ease-in-out"
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
              ? ' bg-gray-200 border-r-4 border-solid border-orange-400 font-semibold'
              : ''
          } relative`}
        >
          <Link
            to="/"
            className="flex items-center text-sm py-4 px-6 h-10 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out"
          >
            <ImEarth className="w-3 h-3 mr-3" />

            <span>Questions</span>
          </Link>
        </li>
        <li className="relative">
          <p className="flex items-center text-sm py-4 px-6 h-10 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out">
            <svg className="w-3 h-3 mr-3">
              {/* <path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path> */}
            </svg>
            <span>Tags</span>
          </p>
        </li>
        <li className="relative">
          <p className="flex items-center text-sm py-4 px-6 h-10 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out">
            <svg className="w-3 h-3 mr-3" role="img">
              {/* <path fill="currentColor" d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"></path> */}
            </svg>
            <span>Users</span>
          </p>
        </li>
        <li className="relative">
          <p className="flex items-center text-sm py-4 px-6 h-10 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-300 ease-in-out">
            <svg className="w-3 h-3 mr-3" role="img">
              {/* <path fill="currentColor" d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"></path> */}
            </svg>
            <span>Companies</span>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
