import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import PageHeading from '../components/PageHeading';

function Register() {
  const { registerUserWithEmailAndPassword, user, loading } = useContext(AppContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2),
    email: yup.string().email('Invalid email format').required('Email Is Required'),
    password: yup.string().required('Password is required').min(6),
    confirmPassword: yup
      .string()
      .required('Confirm the password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageHeading>Sign Up</PageHeading>
      <form className="flex justify-center items-center flex-col gap-2 p-5" onSubmit={handleSubmit(registerUserWithEmailAndPassword)}>
        <p className="text-error uppercase tracking-widest">{errors.name?.message}</p>
        <input
          type="text"
          name="name"
          id="nameInput"
          placeholder="Name"
          className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          {...register('name')}
        />
        <p className="text-error uppercase tracking-widest">{errors.email?.message}</p>
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="Email"
          className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          {...register('email')}
        />
        <p className="text-error uppercase tracking-widest">{errors.password?.message}</p>
        <input
          type="password"
          name="password"
          id="passwordInput"
          placeholder="Password"
          className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          {...register('password')}
        />
        <p className="text-error uppercase tracking-widest">{errors.confirmPassword?.message}</p>
        <input
          type="password"
          name="password"
          id="confirmPasswordInput"
          placeholder="Confirm Password"
          className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          {...register('confirmPassword')}
        />
        <button
          type="submit"
          className="bg-primary text-primary-content text-center border-none p-2 mt-2 rounded-sm tracking-widest uppercase hover:bg-primary-focus w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          Sign Up
        </button>
      </form>
    </m.div>
  );
}

export default Register;
