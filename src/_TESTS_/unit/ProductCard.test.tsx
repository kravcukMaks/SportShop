import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../app/components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 25,
    description: 'Description here',
    image: 'https://example.com/image.jpg',
    handleAddToCart: jest.fn(),
  };

  it('renders product info correctly', () => {
    render(<ProductCard {...mockProduct} />);
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Description here/i)).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image);
  });

  it('calls handleAddToCart when button clicked', () => {
    render(<ProductCard {...mockProduct} />);
    fireEvent.click(screen.getByText(/Додати в кошик/i));
    expect(mockProduct.handleAddToCart).toHaveBeenCalled();
  });
});