import React from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import ListItem from "./ListItem";
import { Typography, Button } from "@mui/material";
export default function Main() {
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
          borderTop: `20px solid ${Theme.palette.support.container}`,
          borderBottom: `20px solid ${Theme.palette.support.container}`,
          paddingLeft: "20px",
          paddingRight: "20px",
          height: "90%",
          backgroundColor: Theme.palette.support.container,
          overflow: "auto",
          "::-webkit-scrollbar": {
            width: "25px",
          },
          "::-webkit-scrollbar-track": {
            background: Theme.palette.support.scrollBar,
          },
          "::-webkit-scrollbar-thumb": {
            background: Theme.palette.support.scroll,
          },
        }}
      >
        <ListItem
          Title={"Title (Important)"}
          SubTitle="Subtitle (Important)"
          isImportant={true}
          isProtected={true}
          id={12}
        />
        <ListItem
          Title={"Title"}
          SubTitle="Subtitle"
          isImportant={false}
          isProtected={false}
        />
        <ListItem
          Title={"Title"}
          SubTitle="Subtitle"
          isImportant={false}
          isProtected={false}
        />
        <ListItem
          Title={"Title"}
          SubTitle="Subtitle"
          isImportant={false}
          isProtected={false}
        />
        <ListItem
          Title={"Title"}
          SubTitle="Subtitle"
          isImportant={false}
          isProtected={false}
        />
        <ListItem
          Title={"Title"}
          SubTitle="Subtitle"
          isImportant={false}
          isProtected={false}
        />
        <ListItem
          Title={"Title"}
          SubTitle="Subtitle"
          isImportant={false}
          isProtected={false}
        />
      </Box>
    </Box>
  );
}
