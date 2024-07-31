import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

let token: string = ''; // This should be managed more securely

export interface User {
  username: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

// Log in and get a token
export const login = async (user: User): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, user);
    token = response.data.token;
    console.log('Login successful, token:', token);
    localStorage.setItem('token', token); // Save token in localStorage
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data || error.message);
    } else {
      console.error('Login failed:', error);
    }
  }
};

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Products fetched:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Fetching products failed:', error.response?.data || error.message);
    } else {
      console.error('Fetching products failed:', error);
    }
    return [];
  }
};

// Delete a product
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`Product with ID ${productId} deleted`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(`Deleting product ${productId} failed:`, error.response?.data || error.message);
    } else {
      console.error(`Deleting product ${productId} failed:`, error);
    }
  }
};

// Update a product
export const updateProduct = async (productId: string, updatedProduct: Partial<Product>): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/products/${productId}`, updatedProduct, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`Product with ID ${productId} updated`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(`Updating product ${productId} failed:`, error.response?.data || error.message);
    } else {
      console.error(`Updating product ${productId} failed:`, error);
    }
  }
};

// Add a product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/products`, product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Product added');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Adding product failed:', error.response?.data || error.message);
    } else {
      console.error('Adding product failed:', error);
    }
  }
};
