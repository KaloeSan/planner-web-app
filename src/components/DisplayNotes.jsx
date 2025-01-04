import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import { MdContentCopy, MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

function DisplayNotes() {
  const { filteredNotes, editForm, copyNote, initDeleteNoteModal } = useContext(AppContext);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="grid p-5 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {filteredNotes.map((note) => {
        return (
          <m.div key={note?.id} className="max-h-full flex flex-col flex-1 bg-base-300 p-5 shadow-md rounded-sm " initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div>
              <h3 className="font-bold text-xl">{note?.noteTitle}</h3>
              <p className="break-words text-xl tracking-wide">{note?.noteContent}</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-5 pt-5 mt-auto md:flex-row md:items-center md:justify-between">
              <p className="capitalize break-words text-sm tracking-wide">{note?.time?.toDate().toLocaleDateString('en-us', options)}</p>
              <div className="flex items-center justify-center gap-5">
                <MdContentCopy className="text-xl cursor-pointer hover:text-primary" onClick={() => copyNote(note)} />
                <FaTrash className="text-xl cursor-pointer hover:text-error" onClick={() => initDeleteNoteModal(note)} />
                <MdEdit className="text-xl cursor-pointer hover:text-accent" onClick={() => editForm(note)} />
              </div>
            </div>
          </m.div>
        );
      })}
      <EditModal />
      <DeleteModal />
    </div>
  );
}

export default DisplayNotes;