import React from 'react';
import { Link } from 'react-router-dom';

import AlertXl from '../Components/icons/AlertXl.png';

const ErrorPage = () => {
  const error = 'error';
  console.log(error);

  return (
    <div className="content flex flex-row stack-gray place-content-center h-screen items-center box-border">
      <img src={AlertXl} alt="Alert" className="mb-24" />
      <div className="flex flex-col ml-4">
        <h1 className="text-2xl mb-1">Page not found</h1>
        <p className="mb-6 text-xl">
          We&apos;re sorry, we couldn&apos;t find the page you requested.
        </p>
        <div>
          <div className="flex flex-row">
            <p className="mb-4">Try </p>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              searching for similar questions
            </Link>
          </div>
          <div className="flex flex-row">
            <p className="mb-4">Browse our </p>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              recent questions
            </Link>
          </div>
          <div className="flex flex-row">
            <p className="mb-4">Browse our </p>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              popular tags
            </Link>
          </div>
          <div className="flex flex-row">
            <p className="mb-4">
              If you feel something is missing that should be here,
            </p>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              contact us.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
