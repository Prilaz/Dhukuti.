// components/DhukutiServices.jsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentIcon from "@mui/icons-material/Payment";

const services = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
    title: "Worldwide Delivery",
    description:
      "We deliver handmade goods across the globe with care and love.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
    title: "100% Authentic Products",
    description: "All products are handcrafted by Nepali artisans.",
  },
  {
    icon: <PaymentIcon sx={{ fontSize: 40 }} />,
    title: "Secure Payments",
    description: "Multiple safe and encrypted payment methods supported.",
  },
];

const DhukutiServices = () => {
  return (
    <Box
      sx={{
        py: 6,
        px: 5,
        margin: "6rem 2rem",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={3}
              sx={{ p: 3, py: 5, textAlign: "center", borderRadius: 4 }}
            >
              <Box sx={{ mb: 2, color: "#E1C16E" }}>{service.icon}</Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DhukutiServices;
