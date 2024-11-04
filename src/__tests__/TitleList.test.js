import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TitleList from '../components/TitleList';
import '@testing-library/jest-dom/extend-expect';

test('renders list of titles', () => {
  const titles = [
    { id: 1, subject: 'Title 1', description: 'Description 1' },
    { id: 2, subject: 'Title 2', description: 'Description 2' },
  ];
  render(<TitleList titles={titles} deleteTitle={() => {}} />);

  expect(screen.getByText(/title 1/i)).toBeInTheDocument();
  expect(screen.getByText(/description 1/i)).toBeInTheDocument();
  expect(screen.getByText(/title 2/i)).toBeInTheDocument();
  expect(screen.getByText(/description 2/i)).toBeInTheDocument();
});

test('calls deleteTitle function when delete button is clicked', () => {
  const deleteTitleMock = jest.fn();
  const titles = [{ id: 1, subject: 'Title 1', description: 'Description 1' }];
  render(<TitleList titles={titles} deleteTitle={deleteTitleMock} />);

  fireEvent.click(screen.getByText(/delete/i));
  expect(deleteTitleMock).toHaveBeenCalledWith(1);
});
