import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product, fetchProducts, addProduct, updateProduct, deleteProduct, fetchUser, User } from '../api';

interface ProductListProps {
  token: string;
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({ token, searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: 'food',
    quantity: 0,  // Added quantity property
  });
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [stockWorth, setStockWorth] = useState<number>(0);

  const fetchAndSetProducts = async () => {
    try {
      const products = await fetchProducts(token);
      setProducts(products);
      calculateAllStockWorth(products);
    } catch (error) {
      console.error('Fetching products failed:', error);
    }
  };

  const fetchAndSetUser = async () => {
    try {
      const user = await fetchUser(token);
      setUser(user);
      console.log(`Logged in as ${user.username}`);
    } catch (error) {
      console.error('Fetching user failed:', error);
    }
  };

  useEffect(() => {
    fetchAndSetProducts();
    fetchAndSetUser();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct as Omit<Product, 'id'>, token);
      setNewProduct({ name: '', price: 0, description: '', category: 'food', quantity: 0 });
      fetchAndSetProducts();
    } catch (error) {
      console.error('Adding product failed:', error);
    }
  };

  const handleUpdate = async (id: string, updatedProduct: Partial<Product>) => {
    try {
      await updateProduct(id, updatedProduct, token);
      fetchAndSetProducts();
    } catch (error) {
      console.error('Updating product failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id, token);
      fetchAndSetProducts();
    } catch (error) {
      console.error('Deleting product failed:', error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const calculateAllStockWorth = (products: Product[]) => {
    const totalWorth = products.reduce((acc, product) => {
      const productPrice = typeof product.price === 'number' ? product.price : 0;
      const productQuantity = typeof product.quantity === 'number' ? product.quantity : 0;
      return acc + productPrice * productQuantity;
    }, 0);
    setStockWorth(totalWorth);
  };

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((product) => (categoryFilter ? product.category === categoryFilter : true));

  return (
    <div>
      {user && (
        <div className="user-card alert alert-info">
          <h3 style={{ fontFamily: "Playwrite AU NSW, cursive" }}>Logged in as: {user.username}</h3>
        </div>
      )}
      <center>
        <h2 style={{ fontFamily: "Playwrite AU NSW, cursive" }}>Products Managing System</h2>
      </center>
      <center>
        <button onClick={fetchAndSetProducts} className="btn btn-outline-warning">Refresh Products</button>
      </center>
      <div className="filter-section">
        <center>
        <select value={categoryFilter} onChange={handleCategoryChange} className="form-select form-select-lg mb-3" style={{width:"50%"}}>
          <option value="">All Categories</option>
          <option value="food">Food</option>
          <option value="drink">Drink</option>
          <option value="goods">Goods</option>
          <option value="electronics">Electronics</option>
        </select>
        </center>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className="product-form">
        <h3>Add New Product</h3>
        <input name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} />
        <input name="price" placeholder="Price" type="number" value={newProduct.price} onChange={handleInputChange} />
        <input name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} />
        <select name="category" value={newProduct.category} onChange={handleInputChange}>
          <option value="food">Food</option>
          <option value="drink">Drink</option>
          <option value="goods">Goods</option>
          <option value="electronics">Electronics</option>
        </select>
        <input name="quantity" placeholder="Quantity" type="number" value={newProduct.quantity} onChange={handleInputChange} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="stock-worth">
        <h3>Total Stock Worth: ${stockWorth.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ProductList;
