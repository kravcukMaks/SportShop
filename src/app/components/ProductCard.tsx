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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl mb-4 text-gray-500 text-lg">
          Нема фото
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>

      <div className="flex justify-between items-center mt-6">
        <span className="text-xl font-semibold text-green-600">${price}</span>
        <button
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          Додати в кошик
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
