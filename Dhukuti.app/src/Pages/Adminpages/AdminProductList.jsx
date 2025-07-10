// src/pages/admin/AdminProductList.jsx
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Modal, TextField, Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AdminDashboard from "./AdminDashboard";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(products);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        console.error("Delete failed:", data.message);
        alert("Delete failed: " + data.message);
      }
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Server error. Check backend.");
    }
  };

  const handleEditOpen = (product) => {
    setCurrentProduct(product);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setCurrentProduct(null);
  };

  const handleEditChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${currentProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: currentProduct.title,
            price: currentProduct.price,
            category: currentProduct.category,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error("Update failed:", data);
        alert("Update failed: " + (data.message || "Unknown error"));
        return;
      }

      setProducts((prev) =>
        prev.map((prod) => (prod._id === data._id ? data : prod))
      );

      handleEditClose();
    } catch (err) {
      console.error("Failed to update product", err);
      alert("Failed to update product: Server error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminDashboard>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Product List
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={`http://localhost:5000${product.image}`}
                        alt={product.title}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditOpen(product)}
                      >
                        <EditIcon />
                      </IconButton>
                      <Modal open={openEdit} onClose={handleEditClose}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="h6" mb={2}>
                            Edit Product
                          </Typography>
                          <TextField
                            fullWidth
                            margin="normal"
                            name="title"
                            label="Title"
                            value={currentProduct?.title || ""}
                            onChange={handleEditChange}
                          />
                          <TextField
                            fullWidth
                            margin="normal"
                            name="price"
                            label="Price"
                            type="number"
                            value={currentProduct?.price || ""}
                            onChange={handleEditChange}
                          />
                          <TextField
                            fullWidth
                            margin="normal"
                            name="category"
                            label="Category"
                            value={currentProduct?.category || ""}
                            onChange={handleEditChange}
                          />
                          <Button
                            variant="contained"
                            color="warning"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleEditSubmit}
                          >
                            Save Changes
                          </Button>
                        </Box>
                      </Modal>

                      <IconButton
                        color="error"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AdminDashboard>
  );
};

export default AdminProductList;
