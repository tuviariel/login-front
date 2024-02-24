import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome', () => {
  render(<App />);
  const titleElement = screen.getByText(/welcome/i);
  expect(titleElement).toBeInTheDocument();
});
