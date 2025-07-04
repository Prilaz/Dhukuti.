import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {orders.map((order) => (
        <Card key={order._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Order ID: {order._id}</Typography>
            <Typography>
              Items:{" "}
              {order.items
                .map((item) => `${item.productId.title} (x${item.quantity})`)
                .join(", ")}
            </Typography>
            <Typography>Shipping: {order.shippingAddress}</Typography>
            <Typography>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default OrdersPage;
