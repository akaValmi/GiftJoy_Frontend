import React from "react";

export default function CartQuantity({ quantity, onQuantityChange }) {
  return (
    <div className="flex items-center gap-2">
      <p>Cantidad:</p>
      <button
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        className="px-2 py-1 bg-gray-200 rounded"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="px-2 py-1 bg-gray-200 rounded"
      >
        +
      </button>
    </div>
  );
}
