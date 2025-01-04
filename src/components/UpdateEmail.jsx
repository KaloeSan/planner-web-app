import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function UpdateEmail() {
  const { user, updateUserEmail } = useContext(AppContext);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email Is Required'),
    password: yup.string().required('Password is required').min(6),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: '', password: '' });
    }
  }, [formState, reset]);
  return (
    <form className="flex flex-col justify-center items-center w-full gap-2 " onSubmit={handleSubmit(updateUserEmail)}>
      <label className="text-xl text-primary-content">Current Email: {user?.email}</label>
      <input
        type="email"
        name="email"
        id="emailInput"
        placeholder="New Email"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        {...register('email')}
      />
      <input
        type="password"
        name="confirmPasswordInput"
        id="confirmPasswordInput"
        placeholder="Enter Password To Confirm"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        {...register('password')}
      />
      <p className="text-error uppercase tracking-widest">{errors.password?.message}</p>
      <button
        type="submit"
        className="bg-primary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase w-full hover:bg-primary-focus sm:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        Update Email
      </button>
    </form>
  );
}

export default UpdateEmail;
