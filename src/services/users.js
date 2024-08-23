import settings from "./settings";
import { HTTPError } from "@/utils/HttpError";

// services/users.js
export async function GetUserInfo() {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${settings.domain}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching user info");
  }

  const data = await response.json();
  return data;
}

export async function ActivateUser(code) {
  const response = await fetch(`${settings.domain}/user/code/${code}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new HTTPError(response);
  }

  const data = await response.json();
  return data;
}

export async function Register(userRegistration) {
  try {
    const response = await fetch(`${settings.domain}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(userRegistration),
    });

    if (!response.ok) {
      // Puedes manejar el error aquí o lanzar una excepción
      const errorData = await response.text(); // Lee el cuerpo solo para obtener el error
      throw new HTTPError(response, errorData);
    }

    const data = await response.json(); // Lee el cuerpo una vez
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

export async function postLogin(credentials) {
  const response = await fetch(`${settings.domain}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error en la autenticación");
  }

  return response;
}
