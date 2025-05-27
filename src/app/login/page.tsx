'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Будь ласка, заповніть усі поля');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Щось пішло не так');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto mt-20 bg-white rounded-2xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-2 text-center text-gray-800">Вхід</h1>
      <p className="text-center text-gray-500 mb-6">Увійдіть до свого облікового запису</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-semibold text-black transition ${
            isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          }`}
        >
          {isLoading ? 'Вхід...' : 'Увійти'}
        </button>
      </form>

      <p className="mt-6 text-center text-black-600">
        Немає акаунта?{' '}
        <Link href="/register" className="text-blue-600 hover:underline font-medium">
          Зареєструватися
        </Link>
      </p>
    </main>
  );
}
