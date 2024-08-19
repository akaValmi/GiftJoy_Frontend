"use client"; // Marca este archivo como un componente del cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Aquí podrías implementar la lógica de checkout,
    // como la integración con una pasarela de pago
    // En este ejemplo solo redirigimos a una página de confirmación
    localStorage.removeItem("cart");
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Procesando tu Pedido...</h1>
      <p>
        Estamos procesando tu pedido. Redirigiendo a la página de
        confirmación...
      </p>
    </div>
  );
}
