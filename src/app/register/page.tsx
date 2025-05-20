'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

export default function RegisterPage() {
  const router = useRouter(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !email || !password) {
      toast.error('Будь ласка, заповніть усі поля');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
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
    }
  };

  return (
    <main className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-12">
    <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
    Реєстрація
    </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" className="block text-gray-700">Ім’я</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700">Прізвище</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300 font-semibold"
        >
         Зареєструватися
        </button>

      </form>

      <p className="mt-6 text-sm text-gray-500 text-center">
       Уже маєте акаунт?{' '}
      <Link
       href="/login"
      className="text-blue-600 font-medium hover:underline transition duration-200"
      >
       Увійти
      </Link>
      </p>

    </main>
  );
}
