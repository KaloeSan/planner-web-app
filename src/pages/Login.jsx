import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import PageHeading from '../components/PageHeading';
import SignInUsingGoogle from '../components/SignInUsingGoogle';

function Login() {
  const { loginWithEmailAndPassword, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email Is Required'),
    password: yup.string().required('Password is required').min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-2 px-5">
      <PageHeading>Sign In</PageHeading>
      <form className="flex flex-col items-center justify-center gap-2 w-full" onSubmit={handleSubmit(loginWithEmailAndPassword)}>
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="Email"
          className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          {...register('email')}
        />

        <p className="text-error uppercase tracking-widest">{errors.email?.message}</p>
        <input
          type="password"
          name="password"
          id="passwordInput"
          placeholder="Password"
          className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          {...register('password')}
        />
        <p className="text-error uppercase tracking-widest">{errors.password?.message}</p>
        <button
          type="submit"
          className="bg-primary text-primary-content text-center flex items-center justify-center gap-3 border-none p-2 rounded-sm tracking-widest uppercase hover:bg-primary-focus w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          Login
        </button>
      </form>
      <h3 className="text-center text-xl uppercase tracking-widest py-3">Or</h3>

      <SignInUsingGoogle />

      <div className=" flex justify-start flex-col bg-base-300 p-5 gap-3 shadow-md rounded-sm w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <PageHeading>Guest Account:</PageHeading>
        <h3 className="break-words text-lg tracking-wide capitalize">
          Email:<span className="lowercase ml-1">test@test.com</span>
        </h3>
        <h3 className="break-words text-lg tracking-wide">
          Password:
          <span className="ml-1">Test!123456</span>
        </h3>
      </div>
    </m.div>
  );
}

export default Login;
