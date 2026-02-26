import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, codingLevel = null) => {
    setCart((prev) => [...prev, { ...product, codingLevel }]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const removeOneByType = (name, codingLevel) => {
    setCart((prev) => {
      const idx = prev.findIndex(item => item.name === name && (item.codingLevel || null) === (codingLevel || null));
      if (idx === -1) return prev;
      return prev.filter((_, i) => i !== idx);
    });
  };

  const addOneMore = (item) => {
    setCart((prev) => [...prev, { ...item }]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeOneByType, addOneMore, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
