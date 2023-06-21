import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from './App';

jest.mock('./Router/LoggedInRoute', () => () => <div>LoggedInRoute</div>);
jest.mock('./Components/Login', () => () => <div>Login</div>);
jest.mock('./Components/Plans', () => () => <div>Plans</div>);
jest.mock('./Components/Admin', () => () => <div>Admin</div>);
jest.mock('./Components/Signup', () => () => <div>Signup</div>);
jest.mock('./Firebase/UserProvider', () => ({ children }) => <div>{children}</div>);
jest.mock('flowbite-react', () => ({ children }) => <div>{children}</div>);

describe('App', () => {
  it('should render Signup at path /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

  it('should render Login at path /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  // Similarly write tests for other routes

  it('should redirect to / for unmatched routes', () => {
    render(
      <MemoryRouter initialEntries={['/non-existing-route']}>
        <Route path="*" element={<App />} />
      </MemoryRouter>
    );
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });
});
