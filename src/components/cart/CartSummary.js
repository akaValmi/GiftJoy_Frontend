import React from "react";

export default function CartSummary({ cartItems, onCheckout }) {
  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">Total:</h2>
        <p className="text-xl font-bold">L. {total.toFixed(2)}</p>
      </div>

      <div>
        <button
          onClick={onCheckout}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Proceder al Checkout
        </button>
      </div>
    </div>
  );
}
