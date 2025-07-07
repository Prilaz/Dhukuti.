// src/pages/admin/AdminAddProduct.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputLabel,
} from "@mui/material";
import AdminDashboard from "./AdminDashboard";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key !== "imagePreview") body.append(key, val);
    });

    try {
      const token = localStorage.getItem("token"); // ✅ get token from storage

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in header
        },
        body,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product Added: " + data.product.title);
      } else {
        throw new Error(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Product creation failed", error);
      alert("❌ Failed to add product");
    }
  };

  return (
    <AdminDashboard>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="title"
            label="Product Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
          <TextField
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <InputLabel htmlFor="image">Product Image</InputLabel>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {form.imagePreview && (
            <Box
              component="img"
              src={form.imagePreview}
              alt="Preview"
              sx={{ width: "100%", mt: 2, borderRadius: 2 }}
            />
          )}

          <Button
            variant="contained"
            type="submit"
            sx={{ bgcolor: "#ffc107", color: "black", mt: 2 }}
          >
            Save Product
          </Button>
        </Box>
      </Paper>
    </AdminDashboard>
  );
};

export default AdminAddProduct;
