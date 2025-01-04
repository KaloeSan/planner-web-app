import React, { useEffect, useState, useContext } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';
import { collection, query, where, onSnapshot, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { FaTrash } from 'react-icons/fa';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

function Calendar() {
  const { user, openAddEventModal, setSelectedSlot, showAddEventModal, openEditEventModal, openDeleteEventModal } = useContext(AppContext);
  const [events, setEvents] = useState([]);

  // Fetch events from Firestore and set them in the state
  useEffect(() => {
    if (!user) return;

    const eventsCollection = collection(db, 'events');
    const q = query(eventsCollection, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEvents = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          start: data.start.toDate(),
          end: data.end.toDate(),
          allDay: data.allDay,
          userId: data.userId
        };
      });
      setEvents(fetchedEvents);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [user]);

  // Handle selecting a slot to add a new event
  const handleSelectSlot = ({ start, end }) => {
    if (!user) {
      toast.error('You must be logged in to add an event');
      return;
    }
    setSelectedSlot({ start, end });
    openAddEventModal();
  };

  // Handle selecting an event to edit
  const handleSelectEvent = (event) => {
    openEditEventModal(event);
  };

  // Handle moving an event
  const moveEvent = async ({ event, start, end }) => {
    try {
      await updateDoc(doc(db, 'events', event.id), {
        start: Timestamp.fromDate(new Date(start)),
        end: Timestamp.fromDate(new Date(end))
      });
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Error updating event');
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = (event, e) => {
    e.stopPropagation();
    openDeleteEventModal(event);
  };

  return (
    <div className={`flex justify-center items-center p-5 ${showAddEventModal ? 'pointer-events-none' : ''}`}>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        allDayAccessor="allDay"
        style={{ height: 500, width: '100%' }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={moveEvent}
        views={['month', 'week', 'day']}
        defaultView="month"
        components={{
          event: ({ event }) => (
            <div className="flex justify-between items-center">
              <span>{event.title}</span>
              <FaTrash className="text-xl cursor-pointer hover:text-error ml-2" onClick={(e) => handleDeleteEvent(event, e)} />
            </div>
          ),
        }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            padding: '5px',
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        })}
      />
    </div>
  );
}

export default Calendar;