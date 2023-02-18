import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setError] = useState(false);
  const [passwordError, setPError] = useState(false);
  const [logginError, setLogginError] = useState(false);
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  function handleSubmit(e) {
    var validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email === undefined || !email.match(validRegex) || email === "") {
      setError(true);
    } else {
      setError(false);
    }
    if (password === undefined || password === "") {
      setPError(true);
    } else {
      setPError(false);
    }
    console.log();
    if (
      emailError === true ||
      passwordError === true ||
      email === "" ||
      password === ""
    ) {
      return;
    } else {
      console.log("Success");
      axios({
        method: "POST",
        url: "http://127.0.0.1:9000/UserAPI/login",
        data: {
          Email: email,
          Password: password,
        },
      })
        .then((res) => {
          delete res.data.result.Password;
          console.log(res.data.result);
          setLogginError(false);
          Dispatch(setUser(res.data.result));
          Dispatch(ChangeAuthStatus(true));
          Navigate("/dashboard");
        })
        .catch((e) => {
          console.log(e);
          setLogginError(true);
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
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}
