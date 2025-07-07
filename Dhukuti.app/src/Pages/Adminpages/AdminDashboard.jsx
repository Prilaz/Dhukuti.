// src/pages/admin/AdminDashboard.jsx
import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Toolbar,
  AppBar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear token
    navigate("/login"); // ✅ Go to login page
  };

  const menuItems = [
    { text: "Products", path: "/admin/products" },
    { text: "Add Product", path: "/admin/products/add" },
    { text: "Team Members", path: "/admin/about/team" },
    { text: "Gallery", path: "/admin/about/gallery" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ Top AppBar with Logout */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#ffeb3b", // bright yellow
          color: "#000", // black text for contrast
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Dhukuti Admin
          </Typography>
          <Button
            onClick={handleLogout}
            sx={{
              color: "#000",
              "&:hover": {
                backgroundColor: "#fff176", // light yellow hover effect
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ✅ Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* ✅ Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#fafafa",
          p: 3,
          ml: `${drawerWidth}px`,
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
