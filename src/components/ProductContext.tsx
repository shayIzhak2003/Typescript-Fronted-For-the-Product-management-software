import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Product } from '../api';

const BASE_URL = 'http://localhost:3000/api';

interface ProductContextProps {
  products: Product[];
  fetchProduct: (id: string) => Promise<Product | null>;
}

export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Fetching products failed:', error);
      }
    };

    fetchProducts();
  }, []);

  const fetchProduct = async (id: string): Promise<Product | null> => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Fetching product failed:', error);
      return null;
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
