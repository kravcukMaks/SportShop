'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function AccountSettingsPage() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userData');
      if (stored) {
        setUserData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Не вдалося зчитати userData з localStorage:', error);
    }
  }, []);

  const validateForm = () => {
    const { firstName, lastName, email, password } = userData;
    return firstName && lastName && email && password;
  };

  const handleChange = (field: keyof UserData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Будь ласка, заповніть всі поля!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('userData', JSON.stringify(userData));
        toast.success(result.message || 'Дані оновлено успішно');
      } else {
        toast.error(result.error || 'Помилка при оновленні даних');
      }
    } catch (error) {
      toast.error('Сталася помилка під час оновлення');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <main className="px-6 py-10 max-w-3xl mx-auto text-white">
    <h1 className="text-4xl font-extrabold mb-10 text-center text-gradient bg-gradient-to-r from-purple-500 to-amber-500 bg-clip-text text-transparent">
      Налаштування акаунта
    </h1>

    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 shadow-xl"
    >
      {[
        { id: 'firstName', label: "Ім’я", type: 'text' },
        { id: 'lastName', label: 'Прізвище', type: 'text' },
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'password', label: 'Пароль', type: 'password' },
      ].map(({ id, label, type }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm text-gray-400 mb-2 font-medium">
            {label}
          </label>
          <input
            type={type}
            id={id}
            value={userData[id as keyof UserData]}
            onChange={handleChange(id as keyof UserData)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#444] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            placeholder={`Введіть ${label.toLowerCase()}`}
          />
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Завантаження...' : 'Оновити дані'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200"
        >
          Повернутися до головного меню
        </button>
      </div>
    </form>
  </main>
);
}