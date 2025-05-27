'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { v4 as uuidv4 } from 'uuid';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const formattedTotalPrice = totalPrice.toLocaleString('uk-UA');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newOrder = {
      id: uuidv4(),
      items: cart,
      total: totalPrice,
      date: new Date().toISOString(),
      customerName: name,
      customerAddress: address,
      customerPhone: phone,
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      clearCart();
      setIsSubmitting(false);
      setOrderCompleted(true);
    } catch (error) {
      console.error('Помилка при оформленні замовлення:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-[#0c0c0c] to-[#1a1a1a] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto bg-[#111] rounded-3xl p-10 shadow-2xl border border-gray-800">
          {!orderCompleted ? (
            <>
              <h1 className="text-4xl font-extrabold text-center text-red-500 mb-12">
                🧾 Оформлення замовлення
              </h1>

              {cart.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">Ваш кошик порожній 🛒</p>
              ) : (
                <div className="mb-10 space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-[#1c1c1c] p-5 rounded-2xl border border-gray-700 shadow-sm"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.imageUrl || '/placeholder.jpg'}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover mr-5 border border-gray-600"
                        />
                        <div>
                          <p className="text-lg font-semibold text-white">{item.title}</p>
                          <p className="text-red-400 text-sm">₴{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-right pt-4 border-t border-gray-700">
                    <p className="text-2xl font-bold text-emerald-400">
                      Разом: ₴{formattedTotalPrice}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                {[
                  { id: 'name', label: "Ім'я", value: name, setValue: setName },
                  { id: 'address', label: 'Адреса', value: address, setValue: setAddress },
                  { id: 'phone', label: 'Телефон', value: phone, setValue: setPhone },
                ].map(({ id, label, value, setValue }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block mb-2 text-gray-400">
                      {label}
                    </label>
                    <input
                      id={id}
                      type={id === 'phone' ? 'tel' : 'text'}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      required
                      className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-semibold py-4 rounded-xl shadow-lg transition duration-200"
                >
                  {isSubmitting ? '⏳ Оформлення...' : '✅ Підтвердити замовлення'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link href="/cart">
                  <button className="text-gray-500 hover:text-white underline transition">
                    ← Назад до кошика
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h1 className="text-5xl font-bold text-emerald-400 mb-6">
                🎉 Дякуємо за покупку!
              </h1>
              <p className="text-gray-400 text-lg mb-10">
                Ваше замовлення оформлено. <br />
                Очікуйте дзвінка найближчим часом!
              </p>
              <Link href="/">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-xl text-lg font-semibold transition">
                  Повернутись на головну
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
