import React from 'react';
import PropagateLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PropagateLoader color="#641AE6" size={100} className="flex" />
    </div>
  );
}

export default Spinner;
