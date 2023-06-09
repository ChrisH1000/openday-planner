import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { signup, logout, login } from './auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signOut: jest.fn(),
  signInWithEmailAndPassword: jest.fn()
}));

describe('signup', () => {
  it('should create a new user with the provided information', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const firstName = 'John';
    const lastName = 'Doe';

    const userCredential = {
      user: {}
    };

    createUserWithEmailAndPassword.mockResolvedValueOnce(userCredential);
    updateProfile.mockResolvedValueOnce();

    await signup({ email, password, firstName, lastName });

    expect(getAuth).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, password);
    expect(updateProfile).toHaveBeenCalledWith(getAuth().currentUser, {
      displayName: `${firstName} ${lastName}`
    });
  });
});

describe('logout', () => {
  it('should sign out the current user', async () => {
    const auth = {
      currentUser: {}
    };

    getAuth.mockReturnValue(auth);
    signOut.mockResolvedValue();

    await logout();

    expect(getAuth).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalledWith(auth);
  });
});

describe('login', () => {
  it('should sign in the user with the provided email and password', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const user = {};

    const userCredential = {
      user
    };

    getAuth.mockReturnValue({});
    signInWithEmailAndPassword.mockResolvedValue(userCredential);

    const result = await login({ email, password });

    expect(getAuth).toHaveBeenCalled();
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, password);
    expect(result).toBe(user);
  });
});
