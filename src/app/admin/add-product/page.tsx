'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AddProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Будь ласка, введіть коректну ціну');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price }),
      });

      if (response.ok) {
        toast.success('Товар успішно додано!');
        router.push('/');
      } else {
        const data = await response.json();
        toast.error(data?.error || 'Помилка при додаванні товару');
      }
    } catch (error) {
      toast.error('Сталась помилка при додаванні товару');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: 'title', label: 'Назва товару', type: 'text' },
    { name: 'description', label: 'Опис', type: 'textarea' },
    { name: 'price', label: 'Ціна (грн)', type: 'number' },
    { name: 'imageUrl', label: 'Посилання на зображення', type: 'text' },
    { name: 'category', label: 'Категорія', type: 'text' },
  ] as const;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Додати новий товар</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map(({ name, label, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-gray-700">{label}</label>
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Додаємо...' : 'Додати товар'}
        </button>
      </form>
    </main>
  );
}