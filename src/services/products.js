import settings from "./settings";
import { HTTPError } from "@/utils/HttpError";

const fetchFromAPI = async (endpoint, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${settings.domain}${endpoint}${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
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
};

export async function getProducts(filters = {}) {
  return fetchFromAPI("/products", filters);
}

export async function getCategories() {
  return fetchFromAPI("/categories");
}

export async function getSizes() {
  return fetchFromAPI("/sizes");
}

export async function getBrands() {
  return fetchFromAPI("/brands");
}

export async function getColors() {
  return fetchFromAPI("/colors");
}
