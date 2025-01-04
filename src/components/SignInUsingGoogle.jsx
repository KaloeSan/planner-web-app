import React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { BsGoogle } from 'react-icons/bs';

function SignInUsingGoogle() {
  const { loginWithGoogle } = useContext(AppContext);

  function signInWithGoogle(e) {
    e.preventDefault();
    loginWithGoogle();
  }
  return (
    <form className="flex justify-center items-center flex-col w-screen pb-5 px-5">
      <button
        type="submit"
        className="bg-secondary text-primary-content text-center flex items-center justify-center gap-3 border-none p-2 rounded-sm tracking-widest uppercase hover:bg-secondary-focus w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        onClick={signInWithGoogle}
      >
        <BsGoogle className="text-xl" />
        Login With Google
      </button>
    </form>
  );
}

export default SignInUsingGoogle;
