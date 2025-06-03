import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
          Rs. {product.price}
        </Typography>
      </CardContent>
      <Button
        component={Link}
        to={`/product/${product.id}`}
        variant="contained"
        color="primary"
        sx={{ m: 2 }}
      >
        View Product
      </Button>
    </Card>
  );
};

export default ProductCard;
