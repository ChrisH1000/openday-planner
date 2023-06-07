import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';
// import { app } from './config';

export const signup = async ({ firstName, lastName, email, password }) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log('signing out');
    })
    .catch((error) => {
      console.error(error);
    });
};

export const login = async ({ email, password }) => {
  const auth = getAuth();
  let user;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
    })
    .catch((error) => {
      console.error(error);
    });

  return user;
};
