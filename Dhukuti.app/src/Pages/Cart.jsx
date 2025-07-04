import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const res = await fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setCart(data.items || []);
  };

  const removeItem = async (productId) => {
    await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchCart();
  };

  const getTotal = () =>
    cart.reduce(
      (total, item) => total + item.quantity * item.productId.price,
      0
    );

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        cart.map((item) => (
          <Card key={item.productId._id} sx={{ mb: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={`http://localhost:5000${item.productId.image}`}
                alt={item.productId.title}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  marginRight: 16,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.productId.title}</Typography>
                <Typography>Price: Rs. {item.productId.price}</Typography>
                <Typography>Qty: {item.quantity}</Typography>
              </Box>
              <IconButton
                onClick={() => removeItem(item.productId._id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6">Total: Rs. {getTotal()}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default CartPage;
