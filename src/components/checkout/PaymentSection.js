// components/checkout/PaymentSection.jsx
import React, { useState, useEffect } from "react";
import { Label, Select } from "./FormComponents";
import { getPaymentTypes } from "../../services/checkout";

const PaymentSection = ({ tipoPago, handleChangeTipoPago }) => {
  const [paymentTypes, setPaymentTypes] = useState([]);

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const data = await getPaymentTypes();
        setPaymentTypes(data);
      } catch (error) {
        console.error("Error fetching payment types:", error);
      }
    };

    fetchPaymentTypes();
  }, []);

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-xl font-semibold mb-4">Pago</h2>
      <div className="mb-4">
        <Label htmlFor="tipoPago">Tipo de Pago</Label>
        <Select
          id="tipoPago"
          value={tipoPago}
          onChange={handleChangeTipoPago}
          options={[
            { value: "", label: "Seleccione un Tipo de Pago" },
            ...paymentTypes.map((type) => ({
              value: type.TipoPagoID,
              label: type.Nombre,
            })),
          ]}
        />
      </div>
    </div>
  );
};

export default PaymentSection;
