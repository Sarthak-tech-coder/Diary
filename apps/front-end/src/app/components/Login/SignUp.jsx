import React, { useState, useContext } from "react";
import { baseUrl } from "../Layout";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { passwordStrength } from "check-password-strength";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { setUser, ChangeAuthStatus } from "../../../../Global/GlobalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function SignUp() {
  const Url = useContext(baseUrl);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const Theme = useTheme();
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RepeatPassword, setRepeatPassword] = useState("");
  const [EmailError, setEmailError] = useState(false);
  const [UsernameLengthError, setUsernameLengthError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [StrengthError, setStrengthError] = useState(false);
  const returnEstring = (e) => {
    if (StrengthError) {
      return "Password is too weak must contain capatals, numbers and characters";
    } else if (PasswordError) {
      return "Passwords do not match or the field is empty";
    } else {
      return "";
    }
  };

  const HandlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setStrengthError(false);
  };
  const HandleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    setPasswordError(false);
    setStrengthError(false);
  };

  const HandleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };
  const HandleUsername = (e) => {
    setUserName(e.target.value);
    setUsernameLengthError(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleclick = () => {
    var validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (Email === undefined || !Email.match(validRegex) || Email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (UserName === undefined || UserName === "" || UserName.length <= 5) {
      setUsernameLengthError(true);
    } else {
      setUsernameLengthError(false);
    }
    if (
      Password !== RepeatPassword ||
      Password === "" ||
      Password === undefined
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      if (passwordStrength(Password).id <= 1) {
        setStrengthError(true);
      } else {
        setStrengthError(false);
      }
    }

    if (
      EmailError ||
      PasswordError ||
      StrengthError ||
      UsernameLengthError ||
      UserName === "" ||
      Password === "" ||
      Email === "" ||
      RepeatPassword === ""
    ) {
      return false;
    } else {
      console.log("requesting");
      const request = axios({
        method: "POST",
        url: `${Url}/userAPI/register`,
        data: {
          Name: UserName,
          Email: Email,
          Password: Password,
        },
      });
      request
        .then((res) => {
          console.log(res);
          Dispatch(setUser(res.data.data));
          Dispatch(ChangeAuthStatus());
          Navigate("/mydiary/all");
        })
        .catch((error) => {
          console.log(error);
          setOpen(true);
        });
    }
  };
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
            label="Username"
            variant="filled"
            fullWidth
            onChange={HandleUsername}
            color="color"
            sx={{
              marginBottom: "15px",
            }}
            value={UserName}
            error={UsernameLengthError}
            helperText={
              UsernameLengthError === true
                ? "Username Must be at least 5 characters"
                : ""
            }
          />
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            color="color"
            sx={{
              marginBottom: "15px",
            }}
            onChange={HandleEmail}
            value={Email}
            error={EmailError}
            helperText={EmailError === true ? "Invalid email address" : ""}
          />
          <TextField
            label="Password"
            variant="filled"
            fullWidth
            color="color"
            type="Password"
            sx={{
              marginBottom: "15px",
            }}
            onChange={HandlePassword}
            value={Password}
            error={PasswordError || StrengthError}
            helperText={returnEstring()}
          />
          <TextField
            label="Repeat Password"
            variant="filled"
            fullWidth
            color="color"
            type="Password"
            sx={{
              marginBottom: "15px",
            }}
            onChange={HandleRepeatPassword}
            value={RepeatPassword}
            error={PasswordError}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: Theme.palette.support.save,
              backgroundColor: Theme.palette.support.shade,
            }}
            onClick={handleclick}
          >
            Submit
          </Button>
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
            Login failed, try again with a different Email address
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

export default SignUp;
