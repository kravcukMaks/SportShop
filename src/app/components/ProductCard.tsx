'use client';

import React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  handleAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  image,
  handleAddToCart
}) => {
  return (
    <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col group">
      {/* Зображення */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-64 sm:h-52 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-64 sm:h-52 bg-gray-200 flex items-center justify-center rounded-xl mb-4 text-gray-500 text-lg">
          Немає фото
        </div>
      )}

      {/* Назва товару */}
      <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">{name}</h3>

      {/* Опис */}
      <p className="text-gray-600 text-sm flex-grow line-clamp-3">{description}</p>

      {/* Ціна і кнопка */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-lg font-bold text-green-600">{price} грн</span>
        <button
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          Додати в кошик
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
