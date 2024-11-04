import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('App Component', () => {
  beforeAll(() => {
    delete window.location;
    window.location = { href: '' };
  });

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Login component at /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    const loginHeader = screen.getByRole('heading', { level: 2, name: /login/i });
    expect(loginHeader).toBeInTheDocument();
  });

  test('renders Register component at /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );

    const registerHeader = screen.getByRole('heading', { level: 2, name: /register/i });
    expect(registerHeader).toBeInTheDocument();
  });

  test('redirects to /login if not authenticated and accessing /dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    const loginHeader = screen.getByRole('heading', { level: 2, name: /login/i });
    expect(loginHeader).toBeInTheDocument();
  });

  test('renders Dashboard component at /dashboard route if authenticated', () => {
    localStorage.setItem('token', 'authenticated');
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    const dashboardHeader = screen.getByRole('heading', { level: 2, name: /dashboard/i });
    expect(dashboardHeader).toBeInTheDocument();
  });
});
