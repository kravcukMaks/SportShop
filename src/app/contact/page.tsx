
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-lg mt-16">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
          Зв’яжіться з нами
        </h1>

        <form className="space-y-6">
          {/* Ім’я */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Ваше ім’я
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Тема */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Тема
            </label>
            <input
              type="text"
              id="subject"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Повідомлення */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Повідомлення
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            ></textarea>
          </div>

          {/* Кнопка */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition duration-200 text-lg font-semibold"
          >
            Відправити повідомлення
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
