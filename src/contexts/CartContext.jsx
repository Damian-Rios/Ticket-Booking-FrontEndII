import React, { createContext, useState, useEffect } from "react";

// Create a context to provide cart-related data and methods
export const CartContext = createContext();

// CartProvider component that manages the shopping cart state and syncs with localStorage
export const CartProvider = ({ children }) => {
  // Retrieve cart from localStorage or initialize as an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Sync cart with localStorage
  }, [cart]); // Re-run whenever cart state changes

  // Adds an event to the cart, either updating quantity or adding a new item
  const addToCart = (event) => {
    console.log("adding event to cart:", event);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === event.id); // Check if item is already in cart
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === event.id ? { ...item, quantity: item.quantity + 1 } : item
        ); // Update quantity if item already exists
      }
      console.log("Event added to cart:", event);
      return [...prevCart, { ...event, quantity: 1 }]; // Add new item to cart with initial quantity of 1
    });
  };

  // Removes an item from the cart by its ID
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId)); // Filter out the item with the given ID
  };

  // Updates the quantity of an item in the cart, ensuring quantity is at least 1
  const updateQuantity = (itemId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta), // Prevent quantity from going below 1
            }
          : item
      )
    );
  };

  // Provide the cart state and related methods to the rest of the app
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children} {/* Render child components */}
    </CartContext.Provider>
  );
};
