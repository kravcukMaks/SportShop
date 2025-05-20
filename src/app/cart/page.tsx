
'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const formattedTotalPrice = totalPrice.toLocaleString('uk-UA');

  return (
    <>
      <Header />
      <main className="p-8">
        <h1 className="text-4xl font-extrabold text-black-800 mb-6 tracking-tight">
        Ваш кошик
        </h1>
        {cart.length === 0 ? (
           <p className="text-gray-500 text-center text-lg mt-12">
           🛒 Ваш кошик порожній. Перейдіть до каталогу, щоб додати товари.
          </p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white shadow-md rounded-xl p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
  <div className="flex items-center">
    {/* Зображення товару */}
    <img
      src={item.imageUrl || '/default-image.jpg'}
      alt={item.title}
      className="w-20 h-20 object-cover rounded-lg mr-4 border border-gray-200"
    />
    <div>
      <p className="text-lg font-semibold text-gray-800">{item.title}</p>
      <p className="text-green-600 font-medium">₴{item.price}</p>
    </div>
  </div>

  <button
    onClick={() => removeFromCart(item.id)}
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
  >
    Видалити
  </button>
</div>
            ))}

            {/* Загальна сума */}
            <p className="text-2xl font-bold text-right text-black-800 mt-8">
              Разом: <span className="text-green-600">₴{formattedTotalPrice}</span>
             </p>

            {/* Кнопки */}
            <div className="flex justify-between items-center mt-6 gap-4">
            <button
             onClick={clearCart}
             className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition duration-200 shadow-md"
             >
             Очистити кошик
             </button>
              <Link href="/checkout">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition duration-200 shadow-md">
               Оформити замовлення
              </button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
