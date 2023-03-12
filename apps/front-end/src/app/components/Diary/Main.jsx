import React from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import ListItem from "./ListItem";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDiaries } from "../../../../Global/GlobalSlice";
export default function Main() {
  const Theme = useTheme();
  const diaries = useSelector(selectDiaries);
  console.log(diaries);
  function LoopEntries(diaries) {
    const array = [];
    for (var i in diaries) {
      array.push(
        <ListItem
          SubTitle={diaries[i].SubTitle}
          Title={diaries[i].Title}
          isImportant={diaries[i].isImportant}
          isProtected={diaries[i].isProtected}
          id={diaries[i]._id}
          Date={diaries[i].Date.Date}
        />
      );
    }
    return array;
  }
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
          boxShadow:
            Theme.palette.mode === "light"
              ? "1px 1px 20px azure"
              : "1px 1px 20px darkslategrey",
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
        {LoopEntries(diaries)}
      </Box>
    </Box>
  );
}
