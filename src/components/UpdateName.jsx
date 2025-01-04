import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function UpdateName() {
  const { user, updateUserName } = useContext(AppContext);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2),
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
      reset({ name: '' });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(updateUserName)} className="flex flex-col justify-center items-center w-full gap-2">
      <label className=" text-xl text-primary-content">Current Name: {user?.displayName}</label>
      <input
        type="text"
        name="name"
        id="nameInput"
        placeholder="New Name"
        className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        {...register('name')}
      />
      <p className="text-error uppercase tracking-widest">{errors.name?.message}</p>
      <button
        type="submit"
        className="bg-primary text-primary-content font-bold file:text-center border-none p-2 rounded-sm tracking-widest uppercase w-full hover:bg-primary-focus sm:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        Update Name
      </button>
    </form>
  );
}

export default UpdateName;
