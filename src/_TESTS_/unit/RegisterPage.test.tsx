import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../../app/register/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Успішна реєстрація' })
  })
) as jest.Mock;

describe('RegisterPage', () => {
  it('submits form with all fields', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/Ім’я/i), { target: { value: 'Іван' } });
    fireEvent.change(screen.getByLabelText(/Прізвище/i), { target: { value: 'Іванов' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'ivan@example.com' } });
    fireEvent.change(screen.getByLabelText(/Пароль/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByText(/Зареєструватися/i));

    await waitFor(() => {
      expect(screen.queryByText('Зареєструватися')).toBeInTheDocument();
    });
  });
});
