import settings from "./settings";
import { HTTPError } from "@/utils/HttpError";

// Obtener tipos de pago
export async function getPaymentTypes() {
  const response = await fetch(`${settings.domain}/payment/types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new HTTPError(response);
  }

  const data = await response.json();
  return data;
}

// Obtener departamentos
export async function getStates() {
  const response = await fetch(`${settings.domain}/states`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new HTTPError(response);
  }

  const data = await response.json();
  return data;
}

// Obtener ciudades por estado
export async function getCitiesByState(stateId) {
  const response = await fetch(`${settings.domain}/states/${stateId}/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new HTTPError(response);
  }

  const data = await response.json();
  return data;
}

// services/checkout.js
export async function submitCheckout(orderData) {
  const response = await fetch(`${settings.domain}/factura`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Error ${response.status}: ${errorData.message || "Unknown error"}`
    );
  }

  return response.json();
}
