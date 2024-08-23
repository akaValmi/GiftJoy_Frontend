import React from "react";
import CartQuantity from "./CartQuantity";
import ActionButton from "./ActionButton";

const CartItem = ({
  item,
  onRemove,
  onUpdateQuantity,
  disableQuantity,
  disableRemove,
}) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantities
    onUpdateQuantity(item.ItemTypeID, item.id, newQuantity);
  };

  return (
    <li
      key={`${item.ItemTypeID}-${item.id}`}
      className="mb-4 border p-4 rounded-lg bg-white shadow-md"
    >
      <div className="flex items-start justify-between">
        {/* Product Image and Details */}
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
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
            <p>Precio total: L. {(item.price * item.quantity).toFixed(2)}</p>
            {item.productos && Array.isArray(item.productos) && (
              <div className="mt-2">
                <h3 className="text-md font-semibold">Productos en Bundle:</h3>
                {item.productos.map((producto, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    {producto.colorId && producto.colorId.ImgColor ? (
                      <img
                        src={producto.colorId.ImgColor}
                        alt={producto.name}
                        className="w-16 h-16 object-cover mr-2"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 mr-2" />
                    )}
                    <div>
                      <p>{producto.name}</p>
                      <p>
                        Talla:{" "}
                        {producto.sizeId ? producto.sizeId.NombreTalla : "N/A"}
                      </p>
                      <p>
                        Color:{" "}
                        {producto.colorId
                          ? producto.colorId.NombreColor
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <CartQuantity
            quantity={item.quantity}
            onQuantityChange={handleQuantityChange}
            disabled={disableQuantity} // Pasar disableQuantity aquí
          />
          <ActionButton
            onClick={() => onRemove(item.ItemTypeID, item.id)}
            disabled={disableRemove} // Agregar lógica para deshabilitar
          >
            Eliminar
          </ActionButton>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
