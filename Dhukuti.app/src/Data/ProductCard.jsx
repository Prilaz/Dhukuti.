import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ use the CartContext

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "90vw",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
  zIndex: 1301,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backdropFilter: "blur(6px)",
  zIndex: 1300,
};

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // ✅ get from context

  const handleOpen = () => {
    setOpen(true);
    setQuantity(1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity); // ✅ use _id, not id
      console.log("Added to cart");
      handleClose();
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  return (
    <>
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
          className="btn btn-outline-warning m-2"
          sx={{ width: "100%", textAlign: "center" }}
          onClick={handleOpen}
        >
          View Product
        </Link>
      </Card>
      {open && <Box sx={overlayStyle} onClick={handleClose} />} {/* blur bg */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{product.title}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              borderRadius: 2,
              mt: 2,
              mb: 2,
            }}
          />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Category: {product.category}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Rs. {product.price}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: 100, mr: 2 }}
            />
            <Link
              className="btn btn-outline-warning mt-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductCard;
