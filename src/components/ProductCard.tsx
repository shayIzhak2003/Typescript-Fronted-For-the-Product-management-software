import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../api';

interface ProductCardProps {
  product: Product;
  onUpdate: (id: string, updatedProduct: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSave = () => {
    onUpdate(product.id, editedProduct);
    setIsEditing(false);
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <>
          <input
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
          />
          <input
            name="price"
            type="number"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
          <input
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={editedProduct.category}
            onChange={handleInputChange}
          >
            <option value="food">Food</option>
            <option value="drink">Drink</option>
            <option value="goods">Goods</option>
            <option value="electronics">Electronics</option>
          </select>
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>Product Name: {product.name}</h3>
          <p> Price: ${product.price}</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;
