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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Products", path: "/admin/products" },
    { text: "Add Product", path: "/admin/products/add" },
    { text: "Team Members", path: "/admin/about/team" },
    { text: "Gallery", path: "/admin/about/gallery" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dhukuti Admin
          </Typography>
        </Toolbar>
      </AppBar>
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
