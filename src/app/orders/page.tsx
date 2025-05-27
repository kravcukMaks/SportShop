'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  title: string;
  price: number;
}

interface Order {
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  total: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) throw new Error('Не вдалося завантажити замовлення');

        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || 'Сталася помилка');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6 sm:p-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center sm:text-left">Ваші замовлення</h1>

      {isLoading ? (
        <p className="text-gray-400">Завантаження...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">Замовлень поки немає.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#1a1a1a] rounded-2xl border border-gray-700 shadow-md"
            >
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                Замовлення #{idx + 1}
              </h2>

              <div className="space-y-1 text-sm sm:text-base text-gray-300">
                <p><strong>Ім’я:</strong> {order.customerName}</p>
                <p><strong>Адреса:</strong> {order.customerAddress}</p>
                <p><strong>Телефон:</strong> {order.customerPhone}</p>
                <p><strong>Сума:</strong> <span className="text-green-400">₴{order.total}</span></p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Товари:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.title} — <span className="text-green-400">₴{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
