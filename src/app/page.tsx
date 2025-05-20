'use client';

import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]); 
  const { cart, addToCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Помилка при отриманні товарів');
      }
    } catch (error) {
      console.error('Помилка при завантаженні товарів:', error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  const handleAddToCart = (product: any) => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      addToCart(product);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="p-8 max-w-7xl mx-auto">
    <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-lg">
      SportShop
    </h1>

      {!isLoggedIn ? (
        <div className="flex justify-center gap-4 mb-10">
  <Link
    href="/login"
    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
  >
    Увійти
  </Link>
  <Link
    href="/register"
    className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
  >
    Реєстрація
  </Link>
</div>
      ) : (
        <div className="flex justify-between items-center px-6 mb-10">
  {/* Ліва кнопка — Вийти */}
  <button
    onClick={handleLogout}
    className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300"
  >
    Вийти
  </button>

  {/* Праві кнопки */}
  <div className="flex gap-3">
    <Link
      href="/account"
      className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
    >
      Налаштування акаунта
    </Link>
    <Link
      href="/cart"
      className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
    >
      Кошик ({cart.length})
    </Link>
    <Link
      href="/orders"
      className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
    >
      Мої замовлення
    </Link>
  </div>
</div>

      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            id={product._id}
            name={product.title} 
            price={product.price}
            description={product.description}
            image={product.imageUrl}
            handleAddToCart={() => handleAddToCart(product)} 
          />
        ))}
      </div>
    </main>
  );
}
