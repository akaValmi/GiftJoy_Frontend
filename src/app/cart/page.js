/*
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

  const handleRemove = (ItemTypeID, id) => {
    // Filtrar el artículo a eliminar usando tipo e id únicos
    const updatedCart = cartItems.filter(
      (item) => item.ItemTypeID !== ItemTypeID || item.id !== id
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
                key={`${item.ItemTypeID}-${item.id}`}
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
                    onClick={() => handleRemove(item.ItemTypeID, item.id)}
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
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import ObservationsInput from "../../components/cart/ObservationsInput";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [observations, setObservations] = useState(""); // Estado para las observaciones

  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedObservations = localStorage.getItem("observations") || ""; // Cargar observaciones desde localStorage

    setCartItems(cart);
    setObservations(savedObservations); // Establecer observaciones iniciales
  }, []);

  const handleRemove = (ItemTypeID, id) => {
    const updatedCart = cartItems.filter(
      (item) => item.ItemTypeID !== ItemTypeID || item.id !== id
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (ItemTypeID, id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.ItemTypeID === ItemTypeID && item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleObservationChange = (e) => {
    setObservations(e.target.value);
    localStorage.setItem("observations", e.target.value); // Guardar observaciones en localStorage
  };
  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-14">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </ul>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">
              Instrucciones Adicionales
            </h2>
            <textarea
              className="border p-2 w-full"
              placeholder="Ejemplo: envolver para regalo, con tarjeta de cumpleaños..."
              value={observations}
              onChange={handleObservationChange}
            />
          </div>
          <CartSummary cartItems={cartItems} onCheckout={handleCheckout} />
        </div>
      )}
    </div>
  );
}
