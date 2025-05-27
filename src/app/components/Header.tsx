'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-black transition-colors">
          SportShop
        </Link>

        {/* Навігація */}
        <nav className="flex items-center space-x-6 text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">Головна</Link>
          <Link href="/catalog" className="hover:text-black transition-colors">Каталог</Link>
          <Link href="/cart" className="hover:text-black transition-colors">Кошик</Link>
          <Link href="/contact" className="hover:text-black transition-colors">Контакти</Link>
          <Link href="/orders">
            <span className="ml-2 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded transition-colors">
              Мої замовлення
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

