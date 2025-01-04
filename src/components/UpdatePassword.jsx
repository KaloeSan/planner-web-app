import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function UpdatePassword() {
  const { updateUserPassword } = useContext(AppContext);

  const schema = yup.object().shape({
    currentPassword: yup.string().required('Password is required').min(6),
    newPassword: yup.string().required('Password is required').min(6),
  });

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ currentPassword: '', newPassword: '' });
    }
  }, [formState, reset]);

  return (
    <form className="flex flex-col justify-center items-center w-full gap-2" onSubmit={handleSubmit(updateUserPassword)}>
      <label className="text-xl text-primary-content">Update Password:</label>
      <input
        type="password"
        name="currentPassword"
        id="currentPasswordInput"
        placeholder="Current Password"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        {...register('currentPassword')}
      />
      <p className="text-error uppercase tracking-widest">{errors.currentPassword?.message}</p>
      <input
        type="password"
        name="newPassword"
        id="newPasswordInput"
        placeholder="Confirm New Password"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        {...register('newPassword')}
      />
      <p className="text-error uppercase tracking-widest">{errors.newPassword?.message}</p>
      <button
        type="submit"
        className="bg-primary text-primary-content font-bold text-center border-none p-2 rounded-sm tracking-widest uppercase w-full hover:bg-primary-focus sm:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        Update Password
      </button>
    </form>
  );
}

export default UpdatePassword;
