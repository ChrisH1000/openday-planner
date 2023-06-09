import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';

export const signup = async ({ firstName, lastName, email, password }) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`
    });
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => {
  const auth = getAuth();
  signOut(auth).catch((error) => {
    console.error(error);
  });
};

export const login = async ({ email, password }) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
