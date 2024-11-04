import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TitleForm from '../components/TitleForm';
import '@testing-library/jest-dom/extend-expect';

test('renders title form inputs and submit button', () => {
  render(<TitleForm addTitle={() => {}} />);
  expect(screen.getByPlaceholderText(/title subject/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/title description/i)).toBeInTheDocument();
  expect(screen.getByText(/add title/i)).toBeInTheDocument();
});

test('calls addTitle function when form is submitted', () => {
  const addTitleMock = jest.fn();
  render(<TitleForm addTitle={addTitleMock} />);

  fireEvent.change(screen.getByPlaceholderText(/title subject/i), { target: { value: 'Sample Title' } });
  fireEvent.change(screen.getByPlaceholderText(/title description/i), { target: { value: 'Sample Description' } });
  fireEvent.click(screen.getByText(/add title/i));

  expect(addTitleMock).toHaveBeenCalled();
});
