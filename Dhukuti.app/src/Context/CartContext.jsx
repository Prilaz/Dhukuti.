import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token"); // ✅ move inside
    if (!token) return;
    const res = await fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCart(data.items || []);
  };

  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token"); // ✅ move inside
    if (!token) return alert("Please login");
    await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    fetchCart(); // ✅ refresh cart after add
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token"); // ✅ move inside
    if (!token) return;
    await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
