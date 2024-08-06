import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';

const Home = ({ filter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(window.location.search);
  const searchTerm = query.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await axios.get('https://dummyjson.com/products');
        let filteredProducts = result.data.products;

        if (searchTerm) {
          filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (filter === 'price_asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (filter === 'price_desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, filter]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
