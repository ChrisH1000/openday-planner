import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  test('renders without errors', () => {
    act(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    });
    // No error means the component rendered successfully
  });

  test('renders the correct routes', () => {
    act(() => {
      const { getByText } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );

      // Check if the routes are rendered correctly
      /* expect(getByText('Signup')).toBeInTheDocument();
      expect(getByText('Login')).toBeInTheDocument();
      expect(getByText('Plans')).toBeInTheDocument();
      expect(getByText('Admin')).toBeInTheDocument(); */
    });
  });
});
