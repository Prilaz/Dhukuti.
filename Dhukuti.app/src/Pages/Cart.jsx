import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Modal,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const fetchCart = async () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
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

  const clearCart = async () => {
    await fetch("http://localhost:5000/api/cart/clear", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchCart();
  };

  const getTotal = () =>
    cart.reduce((total, item) => {
      if (!item.productId) return total;
      return total + item.quantity * item.productId.price;
    }, 0);

  const handleConfirmOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ paymentMethod }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      setShowConfirm(false);
      setOrderSuccess(true);

      setTimeout(() => {
        setOrderSuccess(false);
        setCart([]);
      }, 3000);
    } catch (err) {
      alert("Order failed: " + err.message);
    }
  };

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
        cart
          .filter((item) => item.productId)
          .map((item) => (
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

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Total: Rs. {getTotal()}</Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Select Payment Method:</Typography>
        <RadioGroup
          row
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery"
          />
        </RadioGroup>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => setShowConfirm(true)}
      >
        Proceed to Checkout
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={clearCart}
        sx={{ mt: 2, ml: 2 }}
      >
        Clear Cart
      </Button>

      {/* ✅ Confirmation Modal */}
      <Modal open={showConfirm} onClose={() => setShowConfirm(false)}>
        <Box
          sx={{
            p: 4,
            maxWidth: 500,
            mx: "auto",
            my: "20vh",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Your Order
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {cart
            .filter((item) => item.productId)
            .map((item) => (
              <Box key={item.productId._id} sx={{ mb: 1 }}>
                <Typography>
                  {item.productId.title} × {item.quantity} = Rs.{" "}
                  {item.quantity * item.productId.price}
                </Typography>
              </Box>
            ))}

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: Rs. {getTotal()}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Payment Method:{" "}
            {paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* ✅ Success Animation Modal */}
      <Modal open={orderSuccess}>
        <Box
          sx={{
            p: 4,
            maxWidth: 400,
            mx: "auto",
            my: "30vh",
            bgcolor: "background.paper",
            borderRadius: 3,
            textAlign: "center",
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" gutterBottom color="success.main">
            🎉 Order Successful!
          </Typography>
          <CircularProgress color="success" />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Thank you for shopping with us.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default CartPage;
