import React from "react";
import CartQuantity from "./CartQuantity";

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantities
    onUpdateQuantity(item.ItemTypeID, item.id, newQuantity);
  };

  return (
    <li
      key={`${item.ItemTypeID}-${item.id}`}
      className="mb-4 border p-4 rounded-lg bg-white shadow-md"
    >
      <div className="flex items-center justify-between">
        {/* Contenedor para la imagen y los detalles del producto */}
        <div className="flex items-center gap-6">
          <div>
            <img
              src={item.colorId.ImgColor}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p>Color: {item.colorId.NombreColor}</p>
            {item.sizeId && <p>Talla: {item.sizeId.NombreTalla}</p>}
            <p>Precio: L. {item.price.toFixed(2)}</p>
            <p>
              Precio del producto: L. {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Contenedor para la cantidad y botón de eliminar */}
        <div className="flex items-center gap-4">
          <CartQuantity
            quantity={item.quantity}
            onQuantityChange={handleQuantityChange}
          />

          <button
            onClick={() => onRemove(item.ItemTypeID, item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
}
