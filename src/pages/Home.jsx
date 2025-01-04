import React, { Suspense, useContext } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import PageHeading from '../components/PageHeading';
import AddNote from '../components/AddNote';
import Calendar from '../components/Calendar';
import TodoList from '../components/TodoList';
import '../components/CalendarStyles.css';
import SearchNotes from '../components/SearchNotes';

const LoginOrSignUp = React.lazy(() => import('../components/LoginOrSignUp'));
const DisplayNotes = React.lazy(() => import('../components/DisplayNotes'));
const PaginationButtons = React.lazy(() => import('../components/PaginationButtons'));
import Spinner from '../components/Spinner';

function Home() {
  const { user } = useContext(AppContext);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {!user ? (
        <div className="flex justify-center items-center flex-col gap-4 p-5 m-auto">
          <PageHeading>Login or Sign Up</PageHeading>
          <Suspense fallback={<Spinner />}>
            <LoginOrSignUp />
          </Suspense>
        </div>
      ) : (
        <>
          <AddNote />
          <SearchNotes />
          <Suspense fallback={<Spinner />}>
            <DisplayNotes />
            <PaginationButtons />
            <Calendar />
            <TodoList />
          </Suspense>
        </>
      )}
    </m.div>
  );
}

export default Home;