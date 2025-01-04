import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { CgProfile } from 'react-icons/cg';

function Navbar() {
  const { user, openAddNoteModal } = useContext(AppContext);

  return (
    <nav className="flex justify-between items-center p-5">
      <div className="flex items-center gap-4 flex-wrap">
        <Link to={'/'} className="text-2xl uppercase tracking-widest">
          Kamil Kostka Planner App
        </Link>
        {user && (
          <button
            className="bg-primary text-primary-content text-center font-bold border-none px-4 py-2 rounded-sm tracking-widest uppercase hover:bg-primary-focus"
            onClick={openAddNoteModal}
          >
            Add Note
          </button>
        )}
      </div>
      {user && (
        <Link to={'/profile'} className="text-3xl">
          <CgProfile />
        </Link>
      )}
    </nav>
  );
}

export default Navbar;