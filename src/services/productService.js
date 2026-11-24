const BASE_URL = 'https://dummyjson.com';

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function fetchAllProducts(limit = 0) {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
  const data = await handleResponse(response);
  return data.products;
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`);
  if (response.status === 404) return null;
  return handleResponse(response);
}

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return handleResponse(response);
}

export async function fetchProductsByCategory(category) {
  const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  const data = await handleResponse(response);
  return data.products;
}
