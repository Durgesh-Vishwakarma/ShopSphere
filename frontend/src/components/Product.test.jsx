import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import Product from '@/components/Product';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Eye: () => <div data-testid="eye-icon">Eye</div>,
  ShoppingCart: () => <div data-testid="cart-icon">Cart</div>,
}));

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  image: '/test-image.jpg',
  price: 99.99,
  rating: 4.5,
  numReviews: 10,
  countInStock: 5,
  category: 'Electronics',
  description: 'Test product description',
};

describe('Product Component', () => {
  it('renders product information correctly', () => {
    render(<Product product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('displays product image with correct src and alt', () => {
    render(<Product product={mockProduct} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Product');
  });

  it('shows out of stock badge when countInStock is 0', () => {
    const outOfStockProduct = { ...mockProduct, countInStock: 0 };
    render(<Product product={outOfStockProduct} />);

    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('shows sale badge when product is on sale', () => {
    const saleProduct = { ...mockProduct, onSale: true };
    render(<Product product={saleProduct} />);

    expect(screen.getByText('Sale')).toBeInTheDocument();
  });

  it('displays original price when available', () => {
    const discountedProduct = { ...mockProduct, originalPrice: 149.99 };
    render(<Product product={discountedProduct} />);

    expect(screen.getByText('$149.99')).toBeInTheDocument();
  });

  it('renders action buttons on hover', () => {
    render(<Product product={mockProduct} />);

    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
  });
});