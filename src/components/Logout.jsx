import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Logout() {
  const { signOutUser } = useContext(AppContext);
  return (
    <button
      className="bg-secondary text-primary-content text-center font-bold border-none p-2 rounded-sm tracking-widest uppercase w-full hover:bg-secondary-focus sm:w-1/2 lg:w-1/3 xl:w-1/4"
      onClick={signOutUser}
    >
      Logout
    </button>
  );
}

export default Logout;
