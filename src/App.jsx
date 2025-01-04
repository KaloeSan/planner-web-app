import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import Spinner from './components/Spinner';
import { LazyMotion, domAnimation } from 'framer-motion';
import Footer from './components/Footer';
import AddNoteModal from './components/AddNoteModal';
import AddEventModal from './components/AddEventModal';
import EditEventModal from './components/EditEventModal';
import DeleteEventModal from './components/DeleteEventModal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const location = useLocation();

  return (
    <AppProvider>
      <LazyMotion features={domAnimation}>
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-col min-h-screen">
            <header>
              <Navbar />
            </header>
            <main>
              <Suspense fallback={<Spinner />}>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname} initial={true}>
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>
            <Footer />
            <ToastContainer />
            <AddNoteModal />
            <AddEventModal />
            <EditEventModal />
            <DeleteEventModal className="modal-overlay" />
          </div>
        </DndProvider>
      </LazyMotion>
    </AppProvider>
  );
}

export default App;