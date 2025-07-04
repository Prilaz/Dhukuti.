import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
        const { title, price, description, stock, category, image } = res.data;
        setFormData({ title, price, description, stock, category, image });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image;

    if (formData.image && typeof formData.image !== "string") {
      const form = new FormData();
      form.append("image", formData.image);
      const res = await axios.post("http://localhost:5000/api/upload", form);
      imageUrl = res.data.url;
    }

    const productData = { ...formData, image: imageUrl };

    if (id) {
      await axios.put(`http://localhost:5000/api/products/${id}`, productData);
    } else {
      await axios.post("http://localhost:5000/api/products", productData);
    }

    navigate("/admin/products");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5">
        {id ? "Edit Product" : "Add Product"}
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          name="price"
          label="Price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          sx={{ my: 1 }}
        />
        <TextField
          name="category"
          label="Category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          name="stock"
          label="Stock"
          value={formData.stock}
          onChange={handleChange}
          type="number"
          fullWidth
          sx={{ my: 1 }}
        />
        <Button component="label" variant="contained" sx={{ my: 1 }}>
          Upload Image
          <input type="file" hidden name="image" onChange={handleChange} />
        </Button>
        {typeof formData.image === "string" && (
          <img
            src={formData.image}
            alt="preview"
            style={{ width: "100px", marginTop: "10px" }}
          />
        )}
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update" : "Add"} Product
        </Button>
      </form>
    </Box>
  );
};

export default AdminProductForm;
