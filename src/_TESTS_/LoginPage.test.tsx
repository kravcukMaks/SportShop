import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../app/login/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Успішний вхід' })
  })
) as jest.Mock;

describe('LoginPage', () => {
  it('submits login form', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByText(/Увійти/i));

    await waitFor(() => {
      expect(screen.queryByText('Увійти')).toBeInTheDocument();
    });
  });
});
