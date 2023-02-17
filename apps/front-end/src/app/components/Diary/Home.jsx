import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        weight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Montserrat",
            fontSize: "100px",
          }}
        >
          My Diary
        </Typography>
      </Box>
      <Box
        style={{
          flex: 5,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
