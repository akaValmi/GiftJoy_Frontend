/*import settings from "./settings";
import { HTTPError } from "@/utils/HttpError";

const fetchFromAPI = async (endpoint, method = "GET", body = null, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${settings.domain}${endpoint}${query ? `?${query}` : ""}`;

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new HTTPError(response);
  }

  if (method === "GET") {
    return await response.json();
  }
  return response; // No se espera un JSON en la respuesta para métodos POST, pero puedes ajustarlo según tus necesidades
};

// Funciones para GET
export async function getProducts(filters = {}) {
  return fetchFromAPI("/products", "GET", null, filters);
}

export async function getCategories() {
  return fetchFromAPI("/categories", "GET");
}

export async function getSizes() {
  return fetchFromAPI("/sizes", "GET");
}

export async function getBrands() {
  return fetchFromAPI("/brands", "GET");
}

export async function getColors() {
  return fetchFromAPI("/colors", "GET");
}

// Funciones para POST
export async function postSignup(data) {
  return fetchFromAPI("/signup", "POST", data);
}

export async function postLogin(data) {
  return fetchFromAPI("/api/auth/login", "POST", data);
}
*/

import settings from "./settings";
import { HTTPError } from "@/utils/HttpError";

const fetchFromAPI = async (
  endpoint,
  method = "GET",
  body = null,
  params = {}
) => {
  const query = new URLSearchParams(params).toString();
  const url = `${settings.domain}${endpoint}${query ? `?${query}` : ""}`;

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new HTTPError(response);
  }

  if (method === "GET") {
    return await response.json();
  }
  return response; // No se espera un JSON en la respuesta para métodos POST, pero puedes ajustarlo según tus necesidades
};

// Funciones para GET
export async function getProducts(filters = {}) {
  return fetchFromAPI("/products", "GET", null, filters);
}

export async function getCategories() {
  return fetchFromAPI("/categories", "GET");
}

export async function getSizes() {
  return fetchFromAPI("/sizes", "GET");
}

export async function getBrands() {
  return fetchFromAPI("/brands", "GET");
}

export async function getColors() {
  return fetchFromAPI("/colors", "GET");
}

// Funciones para POST
export async function postSignup(data) {
  return fetchFromAPI("/register", "POST", data);
}

export async function postLogin(credentials) {
  const response = await fetchFromAPI("/login", "POST", credentials);
  if (!response.ok) {
    throw new Error("Error en la autenticación");
  }
  return response;
}
