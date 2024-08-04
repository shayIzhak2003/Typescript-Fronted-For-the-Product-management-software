import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

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

// Fetch user info
export const fetchUser = async (token: string): Promise<User> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/file`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const users: User[] = response.data;

    // Assuming you need to find a specific user, you should know the username beforehand
    // Replace 'your-username' with the actual username or another identifying property
    const user = users.find((user) => user.username === 'shay'); // Adjust this line as per your logic

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Fetching user failed:', error);
    throw error;
  }
};

// Log in and get a token
export const login = async (user: User): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, user);
    const token = response.data.token;
    console.log('Login successful, token:', token);
    localStorage.setItem('token', token); // Save token in localStorage
    return { token };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data || error.message);
    } else {
      console.error('Login failed:', error);
    }
    throw new Error('Login failed');
  }
};

// Fetch all products
export const fetchProducts = async (token: string): Promise<Product[]> => {
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
    throw new Error('Fetching products failed');
  }
};

// Delete a product
export const deleteProduct = async (productId: string, token: string): Promise<void> => {
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
    throw new Error(`Deleting product ${productId} failed`);
  }
};

// Update a product
export const updateProduct = async (productId: string, updatedProduct: Partial<Product>, token: string): Promise<void> => {
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
    throw new Error(`Updating product ${productId} failed`);
  }
};

// Add a product
export const addProduct = async (product: Omit<Product, 'id'>, token: string): Promise<void> => {
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
    throw new Error('Adding product failed');
  }
};
