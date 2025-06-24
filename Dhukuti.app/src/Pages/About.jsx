// src/pages/About.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

import p1 from "../assets/C1.png";
import p2 from "../assets/C2.png";
import p3 from "../assets/C3.png";
import p4 from "../assets/woolen.png";

const images = [p1, p2, p3, p4];

const team = [
  {
    name: "Prilaz Shrestha",
    role: "Founder & Developer",
    image: "/images/team1.jpg",
  },
  {
    name: "Yachu Shrestha",
    role: "Founder & Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "Sujata Karki",
    role: "Contributing Artist",
    image: "/images/team3.jpg",
  },
];

const About = () => (
  <Box sx={{ backgroundColor: "#faf6f1", marginTop: "5rem" }}>
    <Box
      sx={{
        px: { xs: 2, md: 12 },
        py: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(to bottom, #fffaf0, #fef6e4)",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ color: "#E1C16E", mb: 6 }}
      >
        Welcome to Dhukuti
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#4e342e",
          fontSize: "1.125rem",
          lineHeight: 1.8,
          maxWidth: "720px",
          textAlign: "center",
        }}
      >
        At Dhukuti, we connect the essence of Nepal’s handmade artistry with
        modern design. Every product you see carries heritage, care, and
        authenticity. We believe in empowering artisans, sharing stories, and
        sustaining tradition.
      </Typography>
    </Box>

    {/* History Section */}
    <Box
      sx={{
        px: { xs: 2, md: 12 },
        py: 10,
        backgroundColor: "#fffefc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ color: "#4e342e", mb: 8 }}
      >
        Our Journey
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#333",
          fontSize: "1rem",
          lineHeight: 1.7,
          maxWidth: "800px",
          textAlign: "center",
        }}
      >
        Founded in 2025, Dhukuti began as a grassroots effort to support local
        artisans. Inspired by Nepal’s cultural wealth and creativity, our
        founders ventured across villages to find, preserve, and showcase
        timeless artistry. What started as a passion project has now blossomed
        into a trusted global platform for handmade products.
      </Typography>
    </Box>

    {/* Memories Gallery Section */}
    <Box
      sx={{
        px: { xs: 2, md: 12 },
        py: 10,
        backgroundColor: "#fdfaf7",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ color: "#3e2723", mb: 8 }}
      >
        Our Memories
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {images.map((src, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box
              component="img"
              src={src}
              alt={`Memory ${index + 1}`}
              sx={{
                width: "100%",
                height: 192,
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>

    {/* Team Section */}
    <Box
      sx={{
        px: { xs: 2, md: 12 },
        py: 10,
        backgroundColor: "#fffaf0",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" sx={{ color: "#000", mb: 6 }}>
        Meet Our Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {team.map((member, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                transition: "box-shadow 0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  border: "4px solid #E1C16E",
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#E1C16E" }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export default About;
