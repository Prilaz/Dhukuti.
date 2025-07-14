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
  Button,
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
                  <Button
                    onClick={async () => {
                      const confirm = window.confirm(
                        "Mark this order as 'On its way'?"
                      );
                      if (!confirm) return;

                      try {
                        const res = await fetch(
                          `http://localhost:5000/api/orders/${order._id}/mark-on-way`,
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
                          alert("Order status updated!");
                          setOrders((prev) =>
                            prev.map((o) =>
                              o._id === order._id
                                ? { ...o, status: "on its way" }
                                : o
                            )
                          );
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Error updating order");
                      }
                    }}
                    style={{
                      marginRight: 8,
                      padding: "5px 10px",
                      backgroundColor: "#1976d2",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    On its Way
                  </Button>

                  <Button
                    onClick={async () => {
                      const confirm = window.confirm(
                        "Mark this order as completed and remove?"
                      );
                      if (!confirm) return;

                      try {
                        const res = await fetch(
                          `http://localhost:5000/api/orders/${order._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        );
                        if (res.ok) {
                          alert("Order removed");
                          setOrders((prev) =>
                            prev.filter((o) => o._id !== order._id)
                          );
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Error deleting order");
                      }
                    }}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#d32f2f",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Completed
                  </Button>
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
