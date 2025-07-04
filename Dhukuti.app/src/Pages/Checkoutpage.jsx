import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleOrder = async () => {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ shippingAddress: address }),
    });

    if (res.ok) {
      alert("Order placed successfully!");
      navigate("/orders");
    } else {
      alert("Failed to place order.");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, m: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <TextField
        fullWidth
        label="Shipping Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        multiline
        rows={3}
        sx={{ mb: 3 }}
      />
      <Button variant="contained" onClick={handleOrder}>
        Place Order
      </Button>
    </Paper>
  );
};

export default CheckoutPage;
