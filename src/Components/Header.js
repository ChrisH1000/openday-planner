import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../Firebase/UserProvider';
import { logout } from '../Firebase/auth';
import { Button, DarkThemeToggle } from 'flowbite-react';

function Header() {
  const { user } = useSession();

  console.log(user.displayName);

  if (!user) {
    return null;
  }

  const logoutUser = async () => {
    await logout();
    <Navigate to="/login" />;
  };

  return (
    <>
      <DarkThemeToggle />

      <Button onClick={logoutUser}>Logout</Button>
    </>
  );
}

export default Header;
