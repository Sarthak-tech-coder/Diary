import React, { useState, useContext } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectDiarie, setUser } from "../../../../Global/GlobalSlice";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { baseUrl } from "../Layout";
export default function Edit() {
  const Theme = useTheme();
  const Url = useContext(baseUrl);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const location = useLocation();
  const id = location.state.id;
  const Diary = useSelector(selectDiarie(id))[0];
  const [Title, setTitle] = useState(Diary.Title);
  const [SubTitle, setSubTitle] = useState(Diary.SubTitle);
  const [Content, setContent] = useState(Diary.Content);
  const [open, Setopen] = useState(false);
  const handleClose = () => {
    Setopen(false);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSubTitle = (e) => {
    setSubTitle(e.target.value);
  };
  const handleContnet = (e) => {
    setContent(e.target.value);
  };
  const handleDelete = (e) => {
    Setopen(true);
  };
  const handleRedirect = (e) => {
    Navigate(`/mydiary/view/`, { state: { id: id } });
  };
  const handleClick = (e) => {
    if (
      Diary.Title === Title &&
      Diary.SubTitle === SubTitle &&
      Diary.Content === Content
    ) {
      Navigate(`/mydiary/view/`, { state: { id: id } });
    } else {
      axios({
        method: "POST",
        url: `${Url}/UserAPI/UpdateDiary`,
        data: {
          id: Diary._id,
          diary: {
            Title: Title,
            SubTitle: SubTitle,
            Content: Content,
          },
        },
      })
        .then((response) => {
          delete response.data.data.Password;
          Dispatch(setUser(response.data.data));
          Navigate(`/mydiary/view/`, { state: { id: id } });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <>
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
                onChange={handleTitle}
                value={Title}
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
              {Diary.Date.Date}, {Diary.Date.Day}
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
                onChange={handleSubTitle}
                value={SubTitle}
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
              {Diary.Date.Time}
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
            value={Content}
            onChange={handleContnet}
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
              onClick={() => handleClick()}
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
              onClick={() => handleDelete()}
            >
              Discard changes
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to discard the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                color: Theme.palette.support.save,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRedirect}
              sx={{
                color: Theme.palette.support.Reject,
              }}
            >
              Discard
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
