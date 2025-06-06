
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';


interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}


interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.warn('❗ Не вдалося завантажити кошик з localStorage:', error);
    }
  }, []);

  // Синхронізація з localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук 
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('❌ useCart повинен використовуватись всередині CartProvider');
  }
  return context;
};
