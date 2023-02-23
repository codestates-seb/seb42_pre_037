import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = 'error';
  console.log(error);

  return (
    <div className="content">
      <div>
        <h1>Page not found</h1>
        <div>
          <p>We&aposre sorry, we couldn&apost find the page you requested.</p>
        </div>
        <div>
          <p>Try </p>
          <Link to="/">searching for similar questions</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
