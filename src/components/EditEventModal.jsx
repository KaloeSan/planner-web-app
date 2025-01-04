import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';
import { updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { MdClose } from 'react-icons/md';
import PageHeading from './PageHeading';

function EditEventModal() {
  const { user, showEditEventModal, closeEditEventModal, selectedEvent } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [allDay, setAllDay] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setStart(selectedEvent.start.toISOString().slice(0, 16));
      setEnd(selectedEvent.end.toISOString().slice(0, 16));
      setAllDay(selectedEvent.allDay || false);
    }
  }, [selectedEvent]);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Event title is required');
      return;
    }

    try {
      const updatedEvent = {
        title,
        start: Timestamp.fromDate(new Date(start)),
        end: allDay ? Timestamp.fromDate(new Date(start)) : Timestamp.fromDate(new Date(end)),
        allDay,
        userId: user.uid,
      };

      await updateDoc(doc(db, 'events', selectedEvent.id), updatedEvent);
      toast.success('Event updated successfully');
      closeEditEventModal();
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Error updating event');
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteDoc(doc(db, 'events', selectedEvent.id));
      toast.success('Event deleted successfully');
      closeEditEventModal();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event');
    }
  };

  return (
    <>
      {showEditEventModal ? (
        <div className="flex fixed inset-0 bg-neutral-focus bg-opacity-70 h-full w-full z-50">
          <div className="m-auto bg-base-200 h-[50%] w-[100%] p-5 sm:rounded-md sm:shadow-md sm:w-[75%] md:w-[50%] xl:h-[40%] xl:w-[40%]">
            <div className="flex justify-between items-center">
              <PageHeading>Edit Event</PageHeading>
              <button onClick={closeEditEventModal}>
                <MdClose className="text-4xl text-primary-content hover:text-error" />
              </button>
            </div>
            <form className="flex flex-col items-center justify-center gap-5 py-10" onSubmit={handleUpdateEvent}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full"
                placeholder="Event Title"
              />
              {!allDay && (
                <>
                  <input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full"
                  />
                  <input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full"
                  />
                </>
              )}
              <div className="flex gap-4 w-full justify-center items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allDay}
                    onChange={(e) => setAllDay(e.target.checked)}
                    className="form-checkbox"
                  />
                  <span className="all-day-label">All Day</span>
                </label>
              </div>
              <div className="flex gap-4 w-full">
                <button type="submit" className="bg-primary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase hover:bg-primary-focus w-full">
                  Update Event
                </button>
                <button type="button" onClick={handleDeleteEvent} className="bg-error text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase hover:bg-error-focus w-full">
                  Delete Event
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EditEventModal;