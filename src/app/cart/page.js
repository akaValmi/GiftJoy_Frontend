"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import ObservationsInput from "../../components/cart/ObservationsInput";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [observations, setObservations] = useState(""); // Estado para las observaciones

  const router = useRouter(); // Hook para manejar redirección

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
    router.push("/checkout"); // Redirigir a la página de checkout
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
