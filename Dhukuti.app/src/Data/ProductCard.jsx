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
      <Link
        className="btn btn-outline-warning m-3"
        to={`/product/${product.id}`}
      >
        View Product
      </Link>
    </Card>
  );
};

export default ProductCard;
