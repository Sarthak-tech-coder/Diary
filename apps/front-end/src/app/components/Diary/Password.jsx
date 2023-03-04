import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import { selectUser } from "../../../../Global/GlobalSlice";
import { useSelector } from "react-redux";
import axios from "axios";
export async function get(User) {
  try {
    const response = await fetch("http://localhost:9000/MFAPI/MFAQR", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: {
        user: User.Name,
      },
    });
    const blob = await response.blob();
    console.log(response);
    return [URL.createObjectURL(blob), null];
  } catch (error) {
    console.error(`get: error occurred ${error}`);
    return [null, error];
  }
}
export default function Password() {
  const [screenShot, setScreenshot] = useState(undefined);
  const Navigate = useNavigate();
  const User = useSelector(selectUser);
  useEffect(() => {
    async function fetchData() {
      const [response, error] = await get(User);
      if (error) {
        console.log(error);
      } else {
        console.log(response);
        console.log(`got response ${response}`);
        setScreenshot(response);
      }
    }
    fetchData();
  }, []);

  console.log(User.Name, "user");
  let location = useLocation();
  const Theme = useTheme();
  const id = location.state.id;
  const [OTP, setOTP] = useState("");
  const HandleSubmit = () => {
    if (OTP.length === 6) {
      axios({
        method: "POST",
        url: "http://localhost:9000/MFAPI/verify",
        data: {
          Token: OTP,
        },
      }).then((response) => {
        if (response.data.message === true) {
          Navigate(`/mydiary/view/`, { state: { id: id } });
        }
      });
    } else {
      console.log("no");
    }
  };
  const handleChange = (e) => {
    setOTP(e.target.value);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {User.isConnected === true ? (
        <>
          <Typography
            variant="h1"
            display="flex"
            justifyContent="center"
            marginBottom="30px"
            marginTop="200px"
          >
            This is a protected Diary OTP is Required
          </Typography>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="OTP"
              variant="filled"
              fullWidth
              color="color"
              type="Password"
              value={OTP}
              onChange={handleChange}
              sx={{
                marginBottom: "15px",
              }}
            />
            <Button
              variant="contained"
              sx={{
                color: Theme.palette.support.save,
                background: Theme.palette.support.shade,
              }}
              onClick={() => HandleSubmit()}
            >
              Validate
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="h1"
            display="flex"
            justifyContent="center"
            marginBottom="30px"
            marginTop="100px"
          >
            Password Protection Is Not Set Up
          </Typography>
          <Typography
            variant="h1"
            display="flex"
            justifyContent="center"
            marginBottom="30px"
          >
            Scan This QRcode By an Authenticator
          </Typography>
          <img
            src={screenShot}
            className="Screenshot"
            alt="showing screen capture"
          />
          <TextField
            label="OTP"
            variant="filled"
            fullWidth
            color="color"
            type="Password"
            value={OTP}
            onChange={handleChange}
            sx={{
              marginBottom: "15px",
              marginTop: "45px",
              width: "90%",
            }}
          />
          <Button
            variant="contained"
            sx={{
              color: Theme.palette.support.save,
              background: Theme.palette.support.shade,
              width: "90%",
            }}
            onClick={() => HandleSubmit()}
          >
            Validate
          </Button>
        </>
      )}
    </Box>
  );
}
