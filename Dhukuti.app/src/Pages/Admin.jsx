// AdminProductForm.jsx
import React, { useState } from "react";

const AdminProductForm = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(form).forEach(([key, val]) => body.append(key, val));

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body,
    });
    const data = await res.json();
    alert("Product Added: " + data.product.title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        required
      />
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        style={{ backgroundColor: "#ffc107", color: "black" }}
      >
        Save Product
      </button>
    </form>
  );
};

export default AdminProductForm;
