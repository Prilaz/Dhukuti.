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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);

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
  const handleConfirmOrder = async () => {
    if (!address || !contactNumber) {
      alert("Please fill in address and contact number.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return alert("Not logged in");

    const orderData = {
      items: cart
        .filter((item) => item.productId && item.productId._id)
        .map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      total: getTotal(),
      address,
      contactNumber,
      paymentMethod,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        setShowConfirm(false);
        setOrderSuccess(true);
        clearCart();

        // ✅ Hide success modal after 3 seconds
        setTimeout(() => {
          setOrderSuccess(false);
        }, 3000);
      } else {
        const data = await res.json();
        alert(data.message || "Order failed");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const data = await res.json();

      if (res.ok) {
        fetchCart();
      } else {
        alert(data.message || "Failed to clear cart");
      }
    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Failed to clear cart");
    }
  };

  const isContactValid = contactNumber.length === 10;

  const getTotal = () =>
    cart.reduce((total, item) => {
      if (!item.productId) return total;
      return total + item.quantity * item.productId.price;
    }, 0);

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
        <Typography variant="subtitle1">Delivery Address:</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
          sx={{ my: 1 }}
        />

        <Typography variant="subtitle1">Contact Number:</Typography>
        <TextField
          fullWidth
          value={contactNumber}
          onChange={(e) => {
            const value = e.target.value;
            const digitsOnly = value.replace(/\D/g, "");
            if (digitsOnly.length <= 10) {
              setContactNumber(digitsOnly);
            }
          }}
          placeholder="Enter your contact number"
          sx={{ my: 1 }}
          inputProps={{ maxLength: 10 }}
          error={!isContactValid && contactNumber.length > 0}
          helperText={
            !isContactValid && contactNumber.length > 0
              ? "Contact number must be 10 digits."
              : ""
          }
        />
      </Box>
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
          <FormControlLabel value="esewa" control={<Radio />} label="eSewa" />
          <FormControlLabel value="khalti" control={<Radio />} label="Khalti" />
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
              {loading ? "Placing..." : "Confirm Order"}
            </Button>
          </Box>
        </Box>
      </Modal>
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

          {/* ✅ Only show spinner if still loading */}
          {!loading && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Thank you for shopping with us.
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CartPage;
