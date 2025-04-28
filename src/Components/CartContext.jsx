// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Store cart in localStorage whenever cart state changes
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); // Remove empty cart from storage
    }
  }, [cart]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === productId);
      if (productInCart) {
        // Update quantity if the product already exists in the cart
        return prevCart.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        // Add new product to cart
        return [...prevCart, { id: productId, qty: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === productId);
      if (productInCart.qty > 1) {
        // Decrease quantity if more than one
        return prevCart.map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        );
      } else {
        // Remove item from cart if quantity is one
        return prevCart.filter((item) => item.id !== productId);
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
