import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function SearchNotes() {
  const { searchQuery, setSearchQuery } = useContext(AppContext);

  return (
    <div className="flex justify-center p-5">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search notes..."
        className="bg-base-300 border-none p-2 rounded-sm placeholder:uppercase placeholder:tracking-widest w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
      />
    </div>
  );
}

export default SearchNotes;