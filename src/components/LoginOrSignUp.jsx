import React from 'react';
import { Link } from 'react-router-dom';

function LoginOrSignUp() {
  return (
    <>
      <Link
        className="bg-primary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase mt-2 hover:bg-primary-focus w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        to="/login"
      >
        Login
      </Link>
      <h3 className="text-center text-xl uppercase tracking-widest">Or</h3>
      <Link
        className="bg-secondary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase hover:bg-secondary-focus w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        to="/register"
      >
        Sign Up
      </Link>
    </>
  );
}

export default LoginOrSignUp;
