/*"use client"; // Marca este archivo como un componente del cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Obtener los artículos del carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (id) => {
    // Filtrar el artículo a eliminar
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    // Actualizar localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Redirigir a la página de checkout
    router.push("/checkout");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="mb-4 border p-4 rounded-lg bg-white shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p>Precio: ${item.price.toFixed(2)}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-xl font-bold">
              $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Proceder al Checkout
          </button>
        </div>
      )}
    </div>
  );
}
*/

"use client"; // Marca este archivo como un componente del cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Obtener los artículos del carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (type, id) => {
    // Filtrar el artículo a eliminar usando tipo e id únicos
    const updatedCart = cartItems.filter(
      (item) => item.type !== type || item.id !== id
    );
    setCartItems(updatedCart);
    // Actualizar localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Redirigir a la página de checkout
    router.push("/checkout");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="mb-4 border p-4 rounded-lg bg-white shadow-md"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p>Precio: ${item.price.toFixed(2)}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.type, item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-xl font-bold">
              $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Proceder al Checkout
          </button>
        </div>
      )}
    </div>
  );
}
