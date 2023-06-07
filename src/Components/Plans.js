import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../Firebase/UserProvider';
import { logout } from '../Firebase/auth';

function Plans() {
  const { user } = useSession();

  if (!user) {
    return null;
  }

  const logoutUser = async () => {
    await logout();
    <Navigate to="/plans" />;
  };

  return (
    <>
      <h1>Plans page</h1>

      <button className="ui secondary button logout" onClick={logoutUser}>
        LOGOUT
      </button>

      <div>
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>UID: {user.uid}</p>
      </div>
    </>
  );
}

export default Plans;
