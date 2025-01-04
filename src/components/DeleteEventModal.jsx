import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import PageHeading from './PageHeading';
import { MdClose } from 'react-icons/md';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

function DeleteEventModal() {
  const { showDeleteEventModal, closeDeleteEventModal, selectedEvent } = useContext(AppContext);

  const handleDeleteEvent = async () => {
    try {
      await deleteDoc(doc(db, 'events', selectedEvent.id));
      toast.success('Event deleted successfully');
      closeDeleteEventModal();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event');
    }
  };

  return (
    <>
      {showDeleteEventModal ? (
        <div className="flex fixed inset-0 bg-neutral-focus bg-opacity-70 h-full w-full z-50">
          <div className="m-auto bg-base-200 h-[30%] w-[100%] p-5 sm:rounded-md sm:shadow-md sm:w-[75%] md:w-[50%] xl:h-[25%] xl:w-[30%] z-50">
            <div className="flex justify-between items-center">
              <PageHeading>Delete Event</PageHeading>
              <button onClick={closeDeleteEventModal}>
                <MdClose className="text-4xl text-primary-content hover:text-error" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 py-10">
              <p className="text-center">Are You Sure You Want To Delete This Event?</p>
              <div className="flex gap-4 w-full">
                <button onClick={handleDeleteEvent} className="bg-error text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase hover:bg-error-focus w-full">
                  Confirm
                </button>
                <button onClick={closeDeleteEventModal} className="bg-primary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase hover:bg-primary-focus w-full">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DeleteEventModal;