'use client';

import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]); // Замість масиву products
  const { cart, addToCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }

    fetchProducts(); // Завантажити товари з бази
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
      <h1 className="text-4xl font-bold mb-8 text-center">SportShop Магазин</h1>

      {!isLoggedIn ? (
        <div className="text-center mb-8">
          <Link href="/login" className="bg-blue-500 text-white px-3 py-3 rounded hover:bg-blue-600 mx-2">
            Увійти
          </Link>
          <Link href="/register" className="bg-blue-500 text-white px-3 py-3 rounded hover:bg-blue-600 mx-2">
            Реєстрація
          </Link>
        </div>
      ) : (
        <div className="flex justify-between items-center px-4 mb-8">
  {/* Ліва кнопка — Вийти */}
  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    Вийти
  </button>

  {/* Праві кнопки */}
  <div className="flex space-x-2">
    <Link href="/account" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
      Налаштування акаунта
    </Link>
    <Link href="/cart" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
      Кошик ({cart.length})
    </Link>
    <Link href="/orders" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
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
            name={product.title} // Бере title з бази
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
