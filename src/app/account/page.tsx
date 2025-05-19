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
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
      toast.error('Будь ласка, заповніть всі поля!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('userData', JSON.stringify(userData));
        toast.success(result.message);
      } else {
        toast.error(result.error || 'Помилка при оновленні даних');
      }
    } catch {
      toast.error('Помилка при оновленні даних');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Налаштування акаунта</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-purple-700">Ім’я</label>
          <input
            type="text"
            id="firstName"
            value={userData.firstName}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            required
            className="w-full p-2 border border-amber-400 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-purple-700">Прізвище</label>
          <input
            type="text"
            id="lastName"
            value={userData.lastName}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            required
            className="w-full p-2 border border-amber-400 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-purple-700">Email</label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
            className="w-full p-2 border border-amber-400 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-purple-700">Пароль</label>
          <input
            type="password"
            id="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
            className="w-full p-2 border border-amber-400 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className={`bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Завантаження...' : 'Оновити дані'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
          >
            Повернутися до головного меню
          </button>
        </div>
      </form>
    </main>
  );
}
