import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, CircularProgress, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductList = ({ filter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';

  
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  let sortedProducts = [...filteredProducts];
  switch (filter) {
    case 'price_asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {sortedProducts.length > 0 ? (
        sortedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary">
          No products found
        </Typography>
      )}
    </Grid>
  );
};

export default ProductList;
