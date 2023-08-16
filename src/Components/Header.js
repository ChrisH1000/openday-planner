import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../Firebase/UserProvider';
import { logout } from '../Firebase/auth';

function Header() {
  const { user } = useSession();

  if (user) {
    console.log(user.displayName);
  }

  const logoutUser = async () => {
    await logout();
    <Navigate to="/login" />;
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
        <div className="flex-initial w-1/2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Openday Planner</h1>
        </div>

        {user ? (
          <button type="button" className="btn bg-red-400" onClick={logoutUser}>
            Logout
          </button>
        ) : (
          ''
        )}
      </div>
    </header>
  );
}

export default Header;
