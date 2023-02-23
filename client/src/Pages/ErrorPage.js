import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = 'error';
  console.log(error);

  return (
    <div className="content">
      <div className="flex flex-col">
        <h1>Page not found</h1>
        <div>
          <p>We&apos;re sorry, we couldn&apos;t find the page you requested.</p>
        </div>
        <div>
          <div className="flex flex-row">
            <p className="">Try </p>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              searching for similar questions
            </Link>
          </div>
          <div className="flex flex-row">
            <p className="">Browse our </p>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              recent questions
            </Link>
          </div>
          <div className="flex flex-row">
            <p className="">Browse our </p>
            <Link
              to="/"
              className="inline-block items-end text-blue-500 hover:text-blue-800 ml-2"
            >
              popular tags
            </Link>
          </div>
          <div className="flex flex-row">
            <p className="">
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
