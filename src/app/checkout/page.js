"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [cart, setCart] = useState([]);
  const [observations, setObservations] = useState(""); // Estado para las observaciones

  useEffect(() => {
    // Obtener el carrito del localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // Obtener las observaciones del localStorage
    const storedObservations = localStorage.getItem("observations");
    if (storedObservations) {
      setObservations(storedObservations);
    }
  }, []);

  const handleChangeDepartamento = (event) => {
    setDepartamento(event.target.value);
  };

  const handleChangeCiudad = (event) => {
    setCiudad(event.target.value);
  };

  const handleChangeDireccion = (event) => {
    setDireccion(event.target.value);
  };

  const handleChangeTelefono = (event) => {
    setTelefono(event.target.value);
  };

  const handleChangeTipoPago = (event) => {
    setTipoPago(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        {/* Sección de Entrega */}
        <div className="w-1/2 p-4 border-r border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Entrega</h2>
          <div className="mb-4">
            <label
              htmlFor="departamento"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento
            </label>
            <select
              id="departamento"
              value={departamento}
              onChange={handleChangeDepartamento}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Seleccione un Departamento</option>
              <option value="1">Departamento 1</option>
              <option value="2">Departamento 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="ciudad"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad
            </label>
            <select
              id="ciudad"
              value={ciudad}
              onChange={handleChangeCiudad}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Seleccione una Ciudad</option>
              <option value="1">Ciudad 1</option>
              <option value="2">Ciudad 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="direccion"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={handleChangeDireccion}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={handleChangeTelefono}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Sección de Pago */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Pago</h2>
          <div className="mb-4">
            <label
              htmlFor="tipoPago"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Pago
            </label>
            <select
              id="tipoPago"
              value={tipoPago}
              onChange={handleChangeTipoPago}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Seleccione un Tipo de Pago</option>
              <option value="tarjeta">Tarjeta de Crédito</option>
              <option value="transferencia">Transferencia Bancaria</option>
              <option value="efectivo">Pago en Efectivo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sección de Carrito */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
        {cart.length > 0 ? (
          <div className="border border-gray-300 rounded-md p-4">
            {cart.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
                <div className="mt-2">
                  {item.productos && Array.isArray(item.productos) ? (
                    item.productos.map((producto, idx) => (
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
                            {producto.sizeId
                              ? producto.sizeId.NombreTalla
                              : "N/A"}
                          </p>
                          <p>
                            Color:{" "}
                            {producto.colorId
                              ? producto.colorId.NombreColor
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No hay productos para mostrar.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>

      {/* Sección de Observaciones */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Observaciones</h2>
        <p>{observations || "No hay observaciones."}</p>
      </div>
    </div>
  );
};

export default Page;
