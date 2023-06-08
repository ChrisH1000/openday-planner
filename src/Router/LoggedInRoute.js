import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSession } from '../Firebase/UserProvider';

const LoggedInRoute = (props) => {
  const { user, isAdmin, isWatcher } = useSession();

  const loggedIn = user; // determine if authorized, from context or however you're doing it

  console.log('Admin user: ' + isAdmin);
  console.log('Watcher user: ' + isWatcher);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  if (Object.values(props).includes('plans')) {
    console.log('plans path');
    return loggedIn ? <Outlet /> : <Navigate to="/" />;
  } else {
    console.log('other path');
    return loggedIn ? <Navigate to="/plans" /> : <Outlet />;
  }
};

export default LoggedInRoute;
