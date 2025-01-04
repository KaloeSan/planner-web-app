import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdClose } from 'react-icons/md';
import PageHeading from './PageHeading';

function AddNoteModal() {
  const { addNote, showAddNoteModal, closeAddNoteModal } = useContext(AppContext);

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
      closeAddNoteModal();
    }
  }, [formState, reset, closeAddNoteModal]);

  return (
    <>
      {showAddNoteModal ? (
        <div className="flex fixed inset-0 bg-neutral-focus bg-opacity-70 h-full w-full">
          <div className="m-auto bg-base-200 h-[100%] w-[100%] p-5 md:rounded-md md:shadow-md md:h-[75%] md:w-[75%] lg:h-[50%] lg:w-[50%]">
            <div className="flex justify-between items-center">
              <PageHeading>Add Note</PageHeading>
              <button onClick={closeAddNoteModal}>
                <MdClose className="text-4xl text-error" />
              </button>
            </div>
            <form className="flex flex-col justify-center items-center h-full flex-1 py-10 gap-5" onSubmit={handleSubmit(addNote)}>
              <input
                className="bg-base-300 border-none rounded-sm placeholder:uppercase placeholder:tracking-widest p-3 w-full"
                placeholder="Note Title"
                {...register('noteTitle')}
              />
              <textarea
                className=" bg-base-300 border-none resize-none rounded-sm  placeholder:uppercase placeholder:tracking-widest p-5 h-full w-full"
                placeholder="Note Content"
                {...register('noteContent')}
              ></textarea>
              <button className="bg-primary text-primary-content text-center font-bold border-none px-10 py-5 rounded-sm tracking-widest uppercase hover:bg-primary-focus" type="submit">
                Add Note
              </button>
            </form>
            {!formState.isSubmitSuccessful && (
              <>
                <p className="text-error text-center uppercase tracking-widest">{errors.noteTitle?.message}</p>
                <p className="text-error text-center uppercase tracking-widest">{errors.noteContent?.message}</p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AddNoteModal;