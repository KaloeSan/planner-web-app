import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl uppercase tracking-widest">Error!</h1>
      <p className="text-xl uppercase tracking-widest"> The page you requested could not be found</p>
      <Link to={'/'} className="text-xl uppercase tracking-widest bg-base-200 px-10 py-3 rounded-sm hover:bg-base-300">
        Return Home
      </Link>
    </div>
  );
}

export default ErrorPage;
