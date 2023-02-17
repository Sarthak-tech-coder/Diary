import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ListItem({
  Title,
  SubTitle,
  isProtected,
  isImportant,
  id,
}) {
  const Theme = useTheme();
  const Navigate = useNavigate();
  return (
    <Box
      onClick={() => {
        if (id !== undefined) {
          Navigate(`/mydiary/view/${id}`);
        }
      }}
      style={{
        backgroundColor: Theme.palette.support.cover,
        height: "13%",
        marginBottom: "20px",
        paddingLeft: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: " pointer",
      }}
    >
      <div>
        <Typography
          variant="h3"
          sx={{
            color:
              isImportant === true
                ? Theme.palette.Text.other
                : Theme.palette.Text.main,
          }}
        >
          {Title}
        </Typography>
        <Typography
          sx={{
            color:
              isImportant === true
                ? Theme.palette.Text.other
                : Theme.palette.Text.main,
            opacity: 0.8,
          }}
        >
          {SubTitle}
        </Typography>
      </div>
      {isImportant === true ? (
        <span
          style={{
            width: "100px",
            height: "100%",
            backgroundImage: `linear-gradient(to right top, transparent 0%, transparent 50%, ${Theme.palette.Text.other} 50%)`,
          }}
        ></span>
      ) : (
        <div></div>
      )}
    </Box>
  );
}
