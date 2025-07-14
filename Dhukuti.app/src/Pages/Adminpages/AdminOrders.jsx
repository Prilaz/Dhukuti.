import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TableContainer,
} from "@mui/material";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/orders/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorDetail = await res.text();
          throw new Error(
            `Failed to fetch orders. Status: ${res.status}. Details: ${errorDetail}`
          );
        }
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        All Orders
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Placed On</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.userId?.email || "N/A"}</TableCell>
                <TableCell>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.quantity} ×{" "}
                      {item.productId?.title || "Product Deleted"}
                    </div>
                  ))}
                </TableCell>
                <TableCell>Rs. {order.total}</TableCell>
                <TableCell>{order.paymentMethod.toUpperCase()}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.contactNumber}</TableCell>
                <TableCell>{order.status || "Pending"}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {order.status === "pending" ? (
                    <button
                      style={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={async () => {
                        const confirm = window.confirm(
                          "Mark this order as 'On its way'?"
                        );
                        if (!confirm) return;

                        try {
                          const res = await fetch(
                            `http://localhost:5000/api/orders/${order._id}/status`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          );
                          if (res.ok) {
                            alert("Order marked as 'On its way'");
                            // Re-fetch orders
                            setOrders((prev) =>
                              prev.map((o) =>
                                o._id === order._id
                                  ? { ...o, status: "shipped" }
                                  : o
                              )
                            );
                          } else {
                            alert("Failed to update order");
                          }
                        } catch (err) {
                          console.error("Update error", err);
                          alert("Error updating order");
                        }
                      }}
                    >
                      On its Way
                    </button>
                  ) : (
                    <Typography variant="body2" color="success.main">
                      {order.status}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AdminOrders;
