import React from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
export default function Add() {
  const Theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            align: "center",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              width: "40%",
              display: "flex",
              align: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              alignItems="center"
              display="flex"
              width="80px"
              justifyContent="center"
              marginRight="20px"
              color={Theme.palette.Text.Title}
            >
              Title:
            </Typography>
            <TextField
              color="color"
              sx={{
                backgroundColor: Theme.palette.support.shade,
                color: Theme.palette.Text.Title,
                width: "100%",
                label: {
                  color: Theme.palette.Text.Title,
                  font: "Montserrat",
                  fontWeight: "bold",
                },
              }}
            />
          </div>
          <Typography
            variant="h3"
            alignItems={"center"}
            color={Theme.palette.Text.Title}
          >
            3rd Feb 2023, Wednesday
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            align: "center",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "40%",
              display: "flex",
              align: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              alignItems="center"
              display="flex"
              justifyContent="center"
              marginRight="20px"
              width="70px"
              color={Theme.palette.Text.Title}
            >
              SubTitle:
            </Typography>
            <TextField
              color="color"
              sx={{
                backgroundColor: Theme.palette.support.shade,
                color: Theme.palette.Text.Title,
                width: "100%",
                label: {
                  color: Theme.palette.Text.Title,
                  font: "Montserrat",
                  fontWeight: "bold",
                },
              }}
            />
          </div>
          <Typography
            variant="h3"
            alignItems={"center"}
            color={Theme.palette.Text.Title}
            display="flex"
          >
            1:32 AM
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            align: "center",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <Typography variant="h3" color={Theme.palette.Text.Title}>
            Content:
          </Typography>
        </Box>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={14}
          color={"color"}
          sx={{
            backgroundColor: Theme.palette.support.shade,
            color: Theme.palette.Text.Title,
            width: "100%",
            label: {
              color: Theme.palette.Text.Title,
              font: "Montserrat",
              fontWeight: "bold",
            },
            "*::-webkit-scrollbar": {
              width: "25px",
            },
            "*::-webkit-scrollbar-track": {
              background: Theme.palette.support.scrollBar,
            },
            "*::-webkit-scrollbar-thumb": {
              background: Theme.palette.support.scroll,
            },
            "& .MuiInputBase-input": {
              textOverflow: "ellipsis",
            },
            marginBottom: "30px",
            "div textarea": {
              fontSize: "30px",
              lineHeight: "30px",
            },
          }}
        />
        <Box display="flex" justifyContent={"space-around"}>
          <Button
            variant="contained"
            sx={{
              background: Theme.palette.color.container,
              width: "30%",
              height: "50px",
              fontSize: "20px",
              color: Theme.palette.support.save,
              "*": {
                font: "Montserrat",
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              background: Theme.palette.color.container,
              color: Theme.palette.support.Reject,
              fontSize: "20px",
              width: "30%",
              "*": {
                font: "Montserrat",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
