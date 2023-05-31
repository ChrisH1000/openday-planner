import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
