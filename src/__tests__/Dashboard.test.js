import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import '@testing-library/jest-dom/extend-expect';

jest.spyOn(window, 'alert').mockImplementation(() => {});

beforeAll(() => {
  delete window.location;
  window.location = { href: '' };
});

describe('Dashboard Component', () => {
  test('displays "Dashboard" text to verify page render', () => {
    render(<Dashboard />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  test('displays "Connect MetaMask" button when wallet is not connected', () => {
    render(<Dashboard />);
    expect(screen.getByRole('button', { name: /connect metamask/i })).toBeInTheDocument();
  });

  test('displays wallet address after connecting MetaMask', async () => {
    render(<Dashboard />);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  test('logs out and redirects to login page', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(window.location.href).toBe('/login');
  });
});
