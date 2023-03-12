import React, { useState, useContext } from "react";
import { Box } from "@mui/system";
import { baseUrl, collapsedContext } from "../Layout";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import {
  selectUser,
  setLoading,
  setUser,
} from "../../../../Global/GlobalSlice";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function getDay() {
  const Days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date();
  return Days[today.getDay()];
}
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
export default function Add() {
  const Url = useContext(baseUrl);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const Theme = useTheme();
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;
  const [Title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [Content, setContent] = useState("");
  const User = useSelector(selectUser);
  const [Protected, setProtected] = useState(false);
  const [open, setopen] = useState(false);
  const handleClose = (e) => {
    setopen(false);
  };
  const handleProtected = (event) => {
    setProtected(event.target.checked);
  };
  const [Important, setImportant] = useState(false);

  const handleImportant = (event) => {
    setImportant(event.target.checked);
  };
  const HandleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const HandleChangeSubTitle = (e) => {
    setSubTitle(e.target.value);
  };
  const HandleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const HandleClose = (e) => {
    setopen(false);
  };
  const HandleSubmit = () => {
    useDispatch(setLoading(true));
    if (Title !== "" && SubTitle !== "" && Content !== "") {
      axios({
        method: "POST",
        url: `${Url}/UserAPI/diary`,
        data: {
          __id: User._id,
          Title: Title,
          SubTitle: SubTitle,
          Content: Content,
          isProtected: Protected,
          isImportant: Important,
        },
      })
        .then((result) => {
          Dispatch(setLoading(false));

          delete result.data.data.Password;
          Dispatch(setUser(result.data.data));
          Navigate("/mydiary/all");
        })
        .catch((e) => {
          useDispatch(setLoading(false));

          setopen(true);
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
                value={Title}
                onChange={HandleChangeTitle}
                sx={{
                  backgroundColor: Theme.palette.support.shade,
                  color: Theme.palette.Text.Title,
                  width: "100%",
                  zIndex: "0",
                  position: "static",
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
              {date}, {getDay()}
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
                value={SubTitle}
                onChange={HandleChangeSubTitle}
                sx={{
                  backgroundColor: Theme.palette.support.shade,
                  color: Theme.palette.Text.Title,
                  position: "static",
                  width: "100%",
                  zIndex: "0",
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
              {formatAMPM(new Date())}
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
            value={Content}
            onChange={HandleChangeContent}
            rows={12}
            color={"color"}
            position={"static"}
            sx={{
              backgroundColor: Theme.palette.support.shade,
              color: Theme.palette.Text.Title,
              zIndex: "0",
              width: "100%",
              border: "rgb(118, 118, 118) 1px solid ",
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
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row !important",
            }}
          >
            <Tooltip
              title={
                !User.isConnected === true
                  ? "F2A is required for the feature."
                  : "Password protect this diary"
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Protected}
                    onChange={handleProtected}
                    disabled={!User.isConnected}
                    sx={{
                      color: Theme.palette.secondary["main"],
                      "&.Mui-checked": {
                        color: Theme.palette.Text.Title,
                      },
                    }}
                  />
                }
                label="Protected"
              />
            </Tooltip>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Important}
                  onChange={handleImportant}
                  sx={{
                    color: Theme.palette.secondary["main"],
                    "&.Mui-checked": {
                      color: Theme.palette.Text.Title,
                    },
                  }}
                />
              }
              label="Important"
            />
          </FormGroup>
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
              onClick={() => HandleSubmit()}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Failed"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            An Unexpected Error Occurred
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleClose} autoFocus color="color">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
