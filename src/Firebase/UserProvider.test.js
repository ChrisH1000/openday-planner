import { render, act } from '@testing-library/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { UserProvider, UserContext } from './UserProvider'; // replace with your actual file

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

describe('UserProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set loading to false and set user details on auth change', async () => {
    const mockUser = {
      getIdTokenResult: jest.fn().mockResolvedValue({
        claims: {
          admin: true,
          watcher: false
        }
      })
    };
    getAuth.mockReturnValue('authInstance');
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    let contextValues;
    const TestComponent = () => {
      contextValues = React.useContext(UserContext);
      return null;
    };

    await act(async () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    expect(contextValues).toEqual({
      user: mockUser,
      loading: false,
      isAdmin: true,
      isWatcher: false
    });
  });

  it('should unsubscribe on unmount', () => {
    const unsubscribe = jest.fn();
    onAuthStateChanged.mockReturnValue(unsubscribe);

    const { unmount } = render(
      <UserProvider>
        <div />
      </UserProvider>
    );

    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
