"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Definisikan tipe CartItem
type CartItem = {
  cookies_id: number;
  campaign_id: number;
  quantity: number;
  name: string;
  amount: number;
  image?: string;
  slug?: string; // Gambar produk (opsional)
};

// Tipe untuk CartContext
type CartContextType = {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (campaign_id: number) => void;
  clearCart: () => void;
  cartCount: number; // Jumlah total item dalam keranjang
};

// Inisialisasi Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider untuk Context
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Ambil data dari localStorage saat komponen di-mount
  useEffect(() => {
    try {
      const storedItems = JSON.parse(localStorage.getItem("osscart") || "[]");
      if (Array.isArray(storedItems)) {
        setCartItems(storedItems);
      }
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
    }
  }, []);

  // Simpan data ke localStorage setiap kali cartItems berubah
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("osscart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Tambahkan item ke cart
  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.campaign_id === item.campaign_id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.campaign_id === item.campaign_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  // Hapus item dari cart
  const removeItemFromCart = (campaign_id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.campaign_id !== campaign_id));
  };

  // Kosongkan cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("osscart"); // Hapus data dari localStorage
  };

  // Hitung total jumlah item di keranjang
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addItemToCart, removeItemFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook untuk menggunakan CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
