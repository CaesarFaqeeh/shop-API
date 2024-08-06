import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const ProductCard = ({ product }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        boxShadow: 3, 
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6, 
          transform: 'scale(1.05)', 
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
        sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }} 
      />
      <CardContent sx={{ flex: '1 0 auto', padding: 2 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
        <Button
          component={Link}
          to={`/product/${product.id}`}
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
