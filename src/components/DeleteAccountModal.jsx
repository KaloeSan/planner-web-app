import { MdClose } from 'react-icons/md';
import PageHeading from './PageHeading';
import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function DeleteAccountModal() {
  const { showDeleteAcctModal, closeDeleteAccountModal, deleteAccount } = useContext(AppContext);

  const schema = yup.object().shape({
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
      reset({ password: '' });
    }
  }, [formState, reset]);
  return (
    <>
      {showDeleteAcctModal ? (
        <div className="flex fixed inset-0 bg-neutral-focus bg-opacity-70 h-full w-full">
          <div className="m-auto bg-base-200 h-[30%] w-[100%] p-5 sm:rounded-md sm:shadow-md sm:w-[75%] md:w-[50%] xl:h-[25%] xl:w-[30%]">
            <div className="flex justify-between items-center">
              <PageHeading>Delete Account</PageHeading>
              <button>
                <MdClose className="text-4xl text-primary-content hover:text-error" onClick={() => closeDeleteAccountModal()} />
              </button>
            </div>

            <form className="flex flex-col items-center justify-center gap-5 py-10" onSubmit={handleSubmit(deleteAccount)}>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password To Confirm"
                className="bg-base-300 border-none p-2 rounded-sm  placeholder:uppercase placeholder:tracking-widest w-[100%]"
                {...register('password')}
              />
              <button className="bg-primary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase w-full hover:bg-primary-focus">Confirm</button>
            </form>
            <p className="text-error text-center uppercase tracking-widest">{errors.password?.message}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DeleteAccountModal;
