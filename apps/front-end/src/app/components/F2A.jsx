import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "./Layout";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { selectUser, setUser } from "../../../Global/GlobalSlice";
import axios from "axios";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function get(User, Secret) {
  const Url = useContext(baseUrl);
  try {
    const response = await fetch(`${Url}/MFAPI/MFAQR`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        User: User.Name,
        Secret: Secret,
      }),
    });
    const blob = await response.blob();
    console.log(response);
    return [URL.createObjectURL(blob), null];
  } catch (error) {
    console.error(`get: error occurred ${error}`);
    return [null, error];
  }
}

function F2A() {
  const [screenShot, setScreenshot] = useState(undefined);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const User = useSelector(selectUser);
  const Secret = User.Token;
  const Theme = useTheme();
  const [OTP, setOTP] = useState("");
  function navigate() {
    sleep(3000).then(() => {
      Navigate("/home");
    });
  }
  const HandleSubmit = () => {
    if (OTP.length === 6) {
      axios({
        method: "POST",
        url: `${Url}/MFAPI/verify`,
        data: {
          Token: OTP,
          Secret: User.Token,
        },
      }).then((response) => {
        if (response.data.message === true) {
          axios({
            method: "POST",
            url: `${Url}/userAPI/connect`,
            data: {
              _id: User._id,
            },
          }).then((response) => {
            Dispatch(setUser(response.data.data));
            Navigate(`/mydiary/view/`, { state: { id: id } });
          });
        }
      });
    } else {
      console.log("no");
    }
  };
  const handleChange = (e) => {
    setOTP(e.target.value);
  };
  useEffect(() => {
    async function fetchData() {
      const [response, error] = await get(User, Secret);
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
            marginTop="100px"
          >
            F2A is Already enabled
          </Typography>
          {navigate()}
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
            Scan thie QrCode By an Authenticator
          </Typography>
          <Typography
            variant="h1"
            display="flex"
            justifyContent="center"
            marginBottom="30px"
          >
            And Validate Code to Enabled F2A
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

export default F2A;
