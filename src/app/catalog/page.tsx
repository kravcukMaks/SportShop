'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useCart } from '../../context/CartContext';
import CategoryFilter from "../components/CategoryFilter";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Усі');
  const { addToCart } = useCart();
  const router = useRouter();

  // Перевірка авторизації
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Завантаження товарів
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('Помилка при завантаженні товарів:', err);
      }
    };

    fetchProducts();
  }, []);

  // Фільтрація товарів по категорії та пошуку
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'Усі') {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products, selectedCategory]);

  // Додавання до кошика
  const handleAddToCart = (product: any) => {
    if (!isLoggedIn) {
      router.push('/register');
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <Header />
      <main className="p-8 max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-extrabold mb-10 text-center text-black-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🏀 SportShop – Каталог
        </motion.h1>

        {/* Пошук і фільтр категорій */}
        <motion.div
          className="mb-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="🔍 Пошук товарів..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-5 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />

          <CategoryFilter
            categories={['Усі', 'Протеїни', 'Креатин', 'BCAA']}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </motion.div>

        {/* Товари */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredProducts.length === 0 ? (
            <motion.p
              className="text-center text-lg text-gray-400 col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🤷 Товари не знайдено
            </motion.p>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product._id || product.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProductCard
                  id={product._id || product.id}
                  name={product.title}
                  price={product.price}
                  description={product.description}
                  image={product.imageUrl}
                  handleAddToCart={() => handleAddToCart(product)}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
