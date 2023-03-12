import React, { useState, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { baseUrl, collapsedContext } from "../Layout";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import {
  setUser,
  ChangeAuthStatus,
  setLoading,
} from "../../../../Global/GlobalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default function Login() {
  const Url = useContext(baseUrl);
  const Dispatch = useDispatch();
  const Collapsed = useContext(collapsedContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setError] = useState(false);
  const Navigate = useNavigate();
  const [passwordError, setPError] = useState(false);
  const [logginError, setLogginError] = useState(false);
  const [Open, setOpen] = useState(false);
  const [open, setopen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleClose = (e) => {
    setopen(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  function handleSubmit(e) {
    setDisabled(true);
    Dispatch(setLoading(true));
    var validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email === undefined || !email.match(validRegex) || email === "") {
      setError(true);
      setDisabled(false);
    } else {
      setError(false);
    }
    if (password === undefined || password === "") {
      setPError(true);

      setDisabled(false);
    } else {
      setPError(false);
    }
    if (
      emailError === true ||
      passwordError === true ||
      email === "" ||
      password === ""
    ) {
      Dispatch(setLoading(false));
    } else {
      axios({
        method: "POST",
        url: `${Url}/UserAPI/login`,
        data: {
          Email: email,
          Password: password,
        },
      })
        .then((res) => {
          delete res.data.data.Password;
          Dispatch(setUser(res.data.data));
          Dispatch(ChangeAuthStatus());
          Dispatch(setLoading(false));

          Navigate("/mydiary/all");
        })
        .catch((e) => {
          setopen(true);
          setDisabled(false);
          setLogginError(true);
          Dispatch(setLoading(false));
        });
    }
  }

  const Theme = useTheme();

  return (
    <div
      style={{
        height: "50%",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: "Montserrat",
          fontSize: "100px",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        My Diary
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Email"
            variant="filled"
            error={emailError}
            fullWidth
            color="color"
            sx={{
              marginBottom: "15px",
            }}
            onChange={handleEmail}
          />
          <TextField
            label="Password"
            variant="filled"
            error={passwordError}
            fullWidth
            color="color"
            type="Password"
            onChange={handlePassword}
            sx={{
              marginBottom: "15px",
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: Theme.palette.support.save,
              backgroundColor: Theme.palette.support.shade,
            }}
            disabled={disabled}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Failed"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Login failed, please check your email and password before trying
            again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color="color">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
