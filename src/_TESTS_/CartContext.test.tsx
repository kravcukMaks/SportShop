import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  it('adds product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart({ id: '1', title: 'Product', price: 10, imageUrl: '' });
    });
    expect(result.current.cart).toHaveLength(1);
  });

  it('removes product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart({ id: '1', title: 'Product', price: 10, imageUrl: '' });
      result.current.removeFromCart('1');
    });
    expect(result.current.cart).toHaveLength(0);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart({ id: '1', title: 'Product', price: 10, imageUrl: '' });
      result.current.clearCart();
    });
    expect(result.current.cart).toHaveLength(0);
  });
});