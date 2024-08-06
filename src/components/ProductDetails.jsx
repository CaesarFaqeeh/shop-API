import  { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);

      
      const similarResponse = await axios.get(`https://dummyjson.com/products/category/${response.data.category}`);
      const filteredProducts = similarResponse.data.products.filter(p => p.id !== response.data.id);
      setSimilarProducts(filteredProducts);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      <h3>Similar Products</h3>
      <Grid container spacing={2}>
        {similarProducts.map(similarProduct => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={similarProduct.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 2, boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' } }}>
              <CardMedia component="img" height="140" image={similarProduct.thumbnail} alt={similarProduct.title} sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }} />
              <CardContent sx={{ flex: '1 0 auto', padding: 2 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {similarProduct.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {similarProduct.description}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  ${similarProduct.price}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
                <Button component={Link} to={`/product/${similarProduct.id}`} variant="contained" color="primary" sx={{ width: '100%', boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductDetails;
