import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

function PaginationButtons() {
  const { fetchMore, fetchLess } = useContext(AppContext);
  return (
    <div className="flex justify-center items-center gap-5 p-5">
      <button onClick={fetchLess} className="flex items-center justify-center gap-3 text-4xl bg-base-200 px-10 py-3 rounded-sm hover:bg-base-300">
        <AiOutlineArrowLeft />
      </button>

      <button onClick={fetchMore} className="flex items-center justify-center gap-3 text-4xl bg-base-200 px-10 py-3 rounded-sm hover:bg-base-300">
        <AiOutlineArrowRight />
      </button>
    </div>
  );
}

export default PaginationButtons;
