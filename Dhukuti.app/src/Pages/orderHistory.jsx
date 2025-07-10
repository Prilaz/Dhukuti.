import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Paper key={order._id} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">Order ID: {order._id}</Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>Total: Rs. {order.total}</Typography>
            <Typography>Payment: {order.paymentMethod}</Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              {order.items.map((item, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemText
                    primary={`${item.productId.title} x${item.quantity}`}
                    secondary={`Rs. ${item.productId.price}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default OrderHistory;
