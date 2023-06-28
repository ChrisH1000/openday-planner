import React from 'react';
import { useSession } from '../Firebase/UserProvider';

function Plans() {
  const { user, isAdmin } = useSession();

  console.log(user.displayName);

  if (!user) {
    return null;
  }

  return (
    <>
      <h1>Plans page</h1>

      <div>
        <p>Name: {user.displayName !== null ? user.displayName : isAdmin ? 'Admin' : 'Watcher'}</p>
        <p>Email: {user.email}</p>
        <p>UID: {user.uid}</p>
      </div>
    </>
  );
}

export default Plans;
