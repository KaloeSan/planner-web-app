import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import PageHeading from './PageHeading';

function DeleteModal() {
  const { showDeleteModal, closeDeleteModal, deleteNote } = useContext(AppContext);
  return (
    <>
      {showDeleteModal ? (
        <div className="flex fixed inset-0 bg-neutral-focus bg-opacity-70 h-full w-full z-50">
          <div className="flex flex-col justify-center gap-4 m-auto bg-base-200 h-[30%] w-[75%] p-5 rounded-md shadow-md sm:h-[25%] md:w-[40%] xl:w-[25%]">
            <PageHeading>Are You Sure You Want To Delete This Note?</PageHeading>
            <div className="flex gap-5 justify-center items-center pt-5">
              <button
                className="bg-secondary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase hover:bg-secondary-focus w-full"
                onClick={() => deleteNote()}
              >
                Confirm
              </button>
              <button
                className="bg-primary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase hover:bg-primary-focus w-full"
                onClick={() => closeDeleteModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DeleteModal;
