import React, { useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [session, setSession] = useState({
    user: null,
    loading: true,
    isAdmin: false,
    isWatcher: false
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let isAdmin = false;
      let isWatcher = false;

      if (user) {
        const token = await user.getIdTokenResult();
        isAdmin = token.claims.admin;
        isWatcher = token.claims.watcher;
      }

      setSession({ loading: false, user, isAdmin, isWatcher });
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={session}>
      {!session.loading && props.children}
    </UserContext.Provider>
  );
};

/* UserProvider.propTypes = {
  children: PropTypes.UserContext
}; */

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
