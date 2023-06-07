import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const LoggedInRoute = (props) => {
  const auth = getAuth();
  console.log(props);

  const loggedIn = auth.currentUser; // determine if authorized, from context or however you're doing it
  console.log(loggedIn);

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
