"use client";
import React, { useState, useEffect } from "react";
import CartItem from "../../components/cart/CartItem";
import DeliverySection from "../../components/checkout/DeliverySection";
import PaymentSection from "../../components/checkout/PaymentSection";
import Resume from "@/components/checkout/Resume";
import { submitCheckout } from "@/services/checkout";
import { GetUserInfo } from "@/services/users";

const Page = () => {
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [cart, setCart] = useState([]);
  const [observations, setObservations] = useState(""); // Estado para las observaciones
  const [userId, setUserId] = useState(null); // Estado para el ID del usuario

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

    const fetchUserInfo = async () => {
      try {
        const userData = await GetUserInfo();
        console.log("User Data:", userData); // Verifica la respuesta del usuario
        setUserId(userData.usuario_id); // Usa el campo correcto `usuario_id`
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChangeDepartamento = (event) =>
    setDepartamento(event.target.value);
  const handleChangeCiudad = (event) => setCiudad(event.target.value);
  const handleChangeDireccion = (event) => setDireccion(event.target.value);
  const handleChangeTelefono = (event) => setTelefono(event.target.value);
  const handleChangeTipoPago = (event) => setTipoPago(event.target.value);

  const handleRemoveItem = (ItemTypeID, id) => {
    const updatedCart = cart.filter(
      (item) => !(item.ItemTypeID === ItemTypeID && item.id === id)
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (ItemTypeID, id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.ItemTypeID === ItemTypeID && item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Función para calcular el subtotal
  const calculateTotalPrice = () => {
    return cart.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0
    );
  };

  // Función para calcular el ISV (15% del subtotal)
  const calculateISV = () => {
    return calculateTotalPrice() * 0.15;
  };

  // Función para calcular el total (subtotal - ISV)
  const calculateSubtotal = () => {
    const subtotal = calculateTotalPrice();
    const isv = calculateISV();
    return subtotal - isv;
  };
  const subtotal = calculateSubtotal();
  const isv = calculateISV();
  const total = calculateTotalPrice();

  const handleCheckout = async () => {
    if (!userId) {
      alert("Inicia sesión para completar tu compra");
      return;
    }

    try {
      // Verifica si cart está definido y es un array
      const cartData = Array.isArray(cart) ? cart : [];

      const data = {
        departamento: parseInt(departamento, 10),
        ciudad: parseInt(ciudad, 10),
        direccion,
        telefono,
        tipoPago: parseInt(tipoPago, 10),
        cart: cartData.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          ItemTypeID: item.ItemTypeID,
          colorId: item.colorId,
          sizeId: item.sizeId,
          productos: item.productos
            ? item.productos.map((product) => ({
                id: product.id,
                id_bundle: item.id,
                name: product.name,
                quantity: product.quantity,
                ItemTypeID: product.ItemTypeID,
                sizeId: product.sizeId
                  ? {
                      TallaID: product.sizeId.TallaID,
                      NombreTalla: product.sizeId.NombreTalla,
                    }
                  : null,
                colorId: product.colorId,
              }))
            : [],
        })),
        observations,
        userId,
        subtotal,
        isv,
        total,
      };

      console.log(data); // Verifica el formato de los datos que se envían

      await submitCheckout(data);
      alert("Pedido enviado exitosamente!");
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      alert("Ocurrió un error al enviar el pedido.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        {/* Sección de Entrega y Pago a la izquierda */}
        <div className="w-1/2 pr-4">
          <DeliverySection
            departamento={departamento}
            ciudad={ciudad}
            direccion={direccion}
            telefono={telefono}
            handleChangeDepartamento={handleChangeDepartamento}
            handleChangeCiudad={handleChangeCiudad}
            handleChangeDireccion={handleChangeDireccion}
            handleChangeTelefono={handleChangeTelefono}
          />

          <PaymentSection
            tipoPago={tipoPago}
            handleChangeTipoPago={handleChangeTipoPago}
          />
        </div>

        {/* Carrito y Observaciones a la derecha */}
        <div className="w-1/2 pl-4">
          {/* Sección de Carrito */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Artículos:</h2>
            {cart.length > 0 ? (
              <div>
                <ul className="border border-gray-300 rounded-md p-4">
                  {cart.map((item) => (
                    <CartItem
                      key={`${item.ItemTypeID}-${item.id}`}
                      item={item}
                      onRemove={handleRemoveItem}
                      onUpdateQuantity={handleUpdateQuantity}
                      disableQuantity={true} // Deshabilitar botones de cantidad
                      disableRemove={true} // Deshabilitar botón de eliminar
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Observaciones:</h2>
            <p>{observations || "No hay observaciones."}</p>
          </div>

          <Resume subtotal={subtotal} isv={isv} total={total} />

          {/* Botón para enviar el pedido */}
          <div className="mt-8">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
