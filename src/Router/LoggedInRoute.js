import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const LoggedInRoute = () => {
  const auth = getAuth();
  console.log(auth);

  const loggedIn = auth.currentUser; // determine if authorized, from context or however you're doing it
  console.log(loggedIn);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedInRoute;
