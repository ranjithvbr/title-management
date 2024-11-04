import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

test('renders login form with email and password inputs', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('shows error when login details are incorrect', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'wrong@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  expect(screen.getByText(/user not found/i)).toBeInTheDocument();
});

test('navigates to register page when link is clicked', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const registerLink = screen.getByText(/register here/i);
  expect(registerLink).toBeInTheDocument();
  fireEvent.click(registerLink);
});
