import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function AddNote() {
  const { addNote } = useContext(AppContext);

  const schema = yup.object().shape({
    noteTitle: yup
      .string()
      .required('Note title is required')
      .min(2, 'The title must be at least 2 characters in length')
      .max(100, 'The title must be less than or equal to 100 characters in length'),
    noteContent: yup
      .string()
      .required('Note content is required')
      .min(4, 'The note must be at least 4 characters in length')
      .max(10000, 'The note must be at less than or equal to 10000 characters in length'),
  });

  const {
    register,
    reset,
    formState,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ noteTitle: '', noteContent: '' });
    }
  }, [formState, reset]);

  return (
    <>
      <form className="flex justify-center items-center flex-wrap p-5 gap-4" onSubmit={handleSubmit(addNote)}>
        <div className="flex w-full gap-4">
          <textarea
            className="bg-base-300 border-none rounded-sm placeholder:uppercase placeholder:tracking-widest h-40 w-1/3 p-3"
            placeholder="Note Title"
            {...register('noteTitle')}
          ></textarea>  
          <textarea
            className="bg-base-300 border-none rounded-sm placeholder:uppercase placeholder:tracking-widest h-40 w-2/3 p-3"
            placeholder="Note Content"
            {...register('noteContent')}
          ></textarea>
          <button className="bg-primary text-primary-content text-center font-bold border-none px-10 py-5 rounded-sm tracking-widest uppercase hover:bg-primary-focus h-40" type="submit">
            Add Note
          </button>
        </div>
      </form>
      <p className="text-error text-center uppercase tracking-widest">{errors.noteTitle?.message}</p>
      <p className="text-error text-center uppercase tracking-widest">{errors.noteContent?.message}</p>
    </>
  );
}

export default AddNote;