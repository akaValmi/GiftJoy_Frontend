import React from "react";

export default function CartQuantity({ quantity, onQuantityChange, disabled }) {
  return (
    <div className="flex items-center gap-2">
      <p>Cantidad:</p>
      <span>{quantity}</span>

      {!disabled && (
        <>
          <button
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </>
      )}
    </div>
  );
}
