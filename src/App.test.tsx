import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello world', () => {
  render(<App />);
  const p = screen.getByText(/Hello World/i);
  expect(p).toBeInTheDocument();
});
