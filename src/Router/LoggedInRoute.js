import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSession } from '../Firebase/UserProvider';

const LoggedInRoute = (props) => {
  const { user, isAdmin, isWatcher } = useSession();

  console.log(user);
  console.log('Admin user: ' + isAdmin);
  console.log('Watcher user: ' + isWatcher);

  if (!user) {
    if (Object.values(props).includes('login') || Object.values(props).includes('signup')) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  if (isAdmin || isWatcher) {
    if (Object.values(props).includes('login') || Object.values(props).includes('signup')) {
      return <Navigate to="/admin" />;
    } else {
      return <Outlet />;
    }
  } else {
    if (Object.values(props).includes('login') || Object.values(props).includes('signup')) {
      return <Navigate to="/plans" />;
    } else {
      return <Outlet />;
    }
  }
};

export default LoggedInRoute;
