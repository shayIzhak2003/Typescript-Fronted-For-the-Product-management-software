import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from './ProductContext';
import { Product } from '../api';

const ProductInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { fetchProduct } = useContext(ProductContext) || {};

  useEffect(() => {
    const fetchAndSetProduct = async () => {
      if (fetchProduct && id) {
        const productData = await fetchProduct(id);
        setProduct(productData);
      }
    };

    fetchAndSetProduct();
  }, [id, fetchProduct]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-info">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductInfo;
