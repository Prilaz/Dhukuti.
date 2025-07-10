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
import { useCart } from "../context/CartContext"; // ✅ Custom hook
import { Link } from "react-router-dom";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 1000 },
  height: { xs: "auto", md: 370 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
  zIndex: 1301,
  overflow: "auto",
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
  const { addToCart } = useCart(); // ✅ Access addToCart

  const handleOpen = () => {
    setOpen(true);
    setQuantity(1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
      console.log("Added to cart");
      handleClose();
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.2s ease",
          ":hover": { transform: "scale(1.02)" },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:5000${product.image}`}
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
          sx={{ mt: "auto", borderRadius: 0 }}
          onClick={handleOpen}
          className="btn btn-outline-warning mt-2"
        >
          {"View Product "}
        </Link>
      </Card>
      {open && <Box sx={overlayStyle} onClick={handleClose} />} {/* blur bg */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              height: "100%",
            }}
          >
            {/* Image Section */}
            <Box sx={{ flex: 1 }}>
              <Box
                component="img"
                src={`http://localhost:5000${product.image}`}
                alt={product.title}
                sx={{
                  width: "100%",
                  height: { xs: 200, md: "100%" },
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Box>

            {/* Product Info Section */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">{product.title}</Typography>
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Category: {product.category}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                  Rs. {product.price}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <TextField
                  type="number"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  inputProps={{ min: 1 }}
                  size="small"
                  sx={{ width: 100, mr: 2 }}
                />
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductCard;
