
'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const formattedTotalPrice = totalPrice.toLocaleString('uk-UA');

  return (
    <>
      <Header />
      <main className="p-6 md:p-12 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-4"
          >
            <ShoppingCart className="w-8 h-8 text-green-600" />
            Ваш кошик
          </motion.h1>

          {cart.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-500 dark:text-gray-300 text-center mt-24"
            >
              🛒 Ваш кошик порожній. <br /> Перейдіть до каталогу, щоб додати товари.
            </motion.p>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="space-y-6"
            >
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 transition hover:shadow-2xl"
                  >
                    <div className="flex items-center w-full md:w-auto gap-5">
                      <img
                        src={item.imageUrl || '/default-image.jpg'}
                        alt={item.title}
                        className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                        <p className="text-green-600 font-bold">₴{item.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Видалити
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-right text-2xl font-bold text-gray-800 dark:text-white mt-8"
              >
                Разом: <span className="text-green-600">₴{formattedTotalPrice}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-between gap-4 mt-6"
              >
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition shadow-md"
                >
                  Очистити кошик
                </button>
                <Link href="/checkout">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition shadow-md">
                    Оформити замовлення
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
