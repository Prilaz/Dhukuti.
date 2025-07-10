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
import logo from "../../assets/Dhukuti.png";

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
    //{ text: "Team Members", path: "/admin/about/team" },
    //{ text: "Gallery", path: "/admin/about/gallery" },
    { text: "Orders", path: "/admin/orders" },
    { text: "Users", path: "/admin/users" },
    //{ text: "Settings", path: "/admin/settings" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ Top AppBar with Logout */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            <img
              src={logo}
              alt="Dhukuti Logo"
              style={{
                height: "50px",
                width: "auto",
                marginTop: "10px",
                marginLeft: "20px",
              }}
              className="me-2"
            />
          </Typography>
          <Button
            onClick={handleLogout}
            sx={{
              color: "#000",
              "&:hover": {
                backgroundColor: "#d6a829", // light yellow hover effect
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
