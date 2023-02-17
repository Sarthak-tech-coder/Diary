import React from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
export default function View() {
  const Theme = useTheme();
  const { id } = useParams();
  const Navigate = useNavigate();
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
              display: "flex",
              align: "center",
              justifyContent: "left",
            }}
          >
            <Typography
              variant="h3"
              alignItems="center"
              display="flex"
              width="80px"
              color={Theme.palette.Text.Title}
            >
              Title:
            </Typography>
            <Typography variant="h3">Dummy Title</Typography>
          </div>
          <Typography
            variant="h3"
            alignItems={"center"}
            color={Theme.palette.Text.Title}
          >
            DATE, DAY
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
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
              justifyContent: "left",
            }}
          >
            <Typography
              variant="h4"
              alignItems="center"
              display="flex"
              justifyContent="left"
              marginRight="20px"
              width="70px"
              color={Theme.palette.Text.Title}
            >
              SubTitle:
            </Typography>
            <Typography variant="h3">Dummy Sub Title</Typography>
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
          rows={15}
          className="form"
          InputProps={{
            readOnly: true,
          }}
          value={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry standard dummy text ever since the1500s, when an unknown printer took a galley of type and scrambled it tomake a type specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release of Letrasetsheets containing Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the1500s, when an unknown printer took a galley of type and scrambled it tomake a type specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release of Letrasetsheets containing Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry standard dummy text ever since the1500s, when an unknown printer took a galley of type and scrambled it tomake a type specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release of Letrasetsheets containing Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the1500s, when an unknown printer took a galley of type and scrambled it tomake a type specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release of Letrasetsheets containing Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
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
              color: Theme.palette.support.edit,
              "*": {
                font: "Montserrat",
              },
            }}
            onClick={() => Navigate(`/mydiary/edit/${id}`)}
          >
            Edit
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
