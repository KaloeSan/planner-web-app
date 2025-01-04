import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UpdateName from '../components/UpdateName';
import UpdatePassword from '../components/UpdatePassword';
import UpdateEmail from '../components/UpdateEmail';
import Logout from '../components/Logout';
import DeleteAccount from '../components/DeleteAccount';
import DeleteAccountModal from '../components/DeleteAccountModal';

function Profile() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      navigate('/profile');
    }
  }, []);

  return (
    <m.div className="flex flex-col items-center justify-center gap-8 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <UpdateName />
      {user?.providerData?.[0]?.providerId === 'password' ? (
        <>
          <UpdateEmail />
          <UpdatePassword />
          <DeleteAccount />
          <DeleteAccountModal />
        </>
      ) : (
        <></>
      )}
      <Logout />
    </m.div>
  );
}

export default Profile;
