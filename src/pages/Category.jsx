import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await axios.get(`https://dummyjson.com/products/category/${category}`);
      setProducts(result.data.products);
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Category: {category}</h2>
      <ProductList products={products} />
    </div>
  );
};

export default Category;
