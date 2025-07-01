import React from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.productId}>
                <ListItemText
                  primary={`Product ID: ${item.productId}`}
                  secondary={`Quantity: ${item.quantity}`}
                />
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => removeFromCart(item.productId)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="success" sx={{ mt: 3 }}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default CartPage;
