import {
  signup,
  logout,
  login,
} from './auth';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signOut: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe('signup', () => {
  test('should create a new user with the provided information', async () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john@example.com';
    const password = 'password';

    const auth = { currentUser: {} };
    const userCredential = { user: { displayName: `${firstName} ${lastName}` } };
    getAuth.mockReturnValue(auth);
    createUserWithEmailAndPassword.mockResolvedValue(userCredential);

    await signup({ firstName, lastName, email, password });

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(updateProfile).toHaveBeenCalledWith(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  });

  test('should log an error if an error occurs during signup', async () => {
    const email = 'john@example.com';
    const password = 'password';

    const auth = { currentUser: {} };
    const error = new Error('Signup failed');
    getAuth.mockReturnValue(auth);
    createUserWithEmailAndPassword.mockRejectedValue(error);

    console.error = jest.fn(); // Mock console.error

    await signup({ email, password });

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});

describe('logout', () => {
  test('should sign out the current user', async () => {
    const auth = { currentUser: {} };
    getAuth.mockReturnValue(auth);

    const signOutPromise = new Promise((resolve) => resolve());
    signOut.mockReturnValue(signOutPromise);

    await logout();

    expect(getAuth).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalledWith(auth);
  });

  test('should log an error if an error occurs during logout', async () => {
    const auth = { currentUser: {} };
    const error = new Error('Logout failed');
    getAuth.mockReturnValue(auth);
    signOut.mockRejectedValue(error);

    console.error = jest.fn(); // Mock console.error

    await logout();

    expect(getAuth).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalledWith(auth);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});

describe('login', () => {
  test('should sign in the user with the provided email and password', async () => {
    const email = 'john@example.com';
    const password = 'password';

    const auth = { currentUser: {} };
    const userCredential = { user: { email } };
    getAuth.mockReturnValue(auth);
    signInWithEmailAndPassword.mockResolvedValue(userCredential);

    const result = await login({ email, password });

    expect(getAuth).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(result).toBe(userCredential.user);
  });

  test('should log an error if an error occurs during login', async () => {
    const email = 'john@example.com';
    const password = 'password';

    const auth = { currentUser: {} };
    const error = new Error('Login failed');
    getAuth.mockReturnValue(auth);
    signInWithEmailAndPassword.mockRejectedValue(error);

    console.error = jest.fn(); // Mock console.error

    const result = await login({ email, password });

    expect(getAuth).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(console.error).toHaveBeenCalledWith(error);
    expect(result).toBeNull();
  });
});
