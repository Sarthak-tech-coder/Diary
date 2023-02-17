import { Box } from "@mui/system";
import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import { ToggleMode, selectMode } from "../../../Global/GlobalSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InboxIcon from "@mui/icons-material/Inbox";
import ShareIcon from "@mui/icons-material/Share";
import ArticleIcon from "@mui/icons-material/Article";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
function CheckActive(to, pathname, text) {
  const location = useLocation();
  if (to !== undefined) {
    return location.pathname.includes(to) ? true : false;
  } else {
    return pathname === text.replace(" ", "").toLowerCase() ? true : false;
  }
}
function Item({ icon, text, to, variant }) {
  const location = useLocation();
  let pathname = location.pathname.split("/")[1].toLowerCase();
  return (
    <MenuItem
      style={{
        marginTop: "5px",
        marginBlock: "5px",
      }}
      icon={icon}
      component={<Link to={to || `/${text.replace(" ", "").toLowerCase()}`} />}
      active={CheckActive(to, pathname, text)}
    >
      <Typography variant={variant || "h4"}>{text}</Typography>
    </MenuItem>
  );
}
function Layout() {
  const Theme = useTheme();
  const Mode = useSelector(selectMode);
  const Dispatch = useDispatch();
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      sx={{
        ".ps-sidebar-root": {
          border: "0px",
        },
        ".ps-active a": {
          background: Theme.palette.background.xff,
          color: Theme.palette.Text.other,
        },
        ".ps-menuitem-root a:hover": {
          background: Theme.palette.background.xff,
        },
        ".css-ewdv3l": {
          background: Theme.palette.background.main,
        },
      }}
    >
      <Sidebar
        backgroundColor={Theme.palette.background.main}
        style={{
          height: "100%",
          color: Theme.palette.Text.main,
        }}
      >
        <Menu
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <hr className="line" />
          <Item text="Home" icon={<HomeIcon />} />
          <SubMenu
            label="Diary"
            icon={<LibraryBooksIcon />}
            className="MuiTypography-root MuiTypography-h4 css-1dofcof-MuiTypography-root"
          >
            <Item
              text="My Diary"
              icon={<ArticleIcon />}
              to="/mydiary/view"
              variant="h5"
            />
            <Item
              text="New Diary"
              icon={<AddBoxIcon />}
              to="/mydiary/add"
              variant="h5"
            />
          </SubMenu>
          <Item text="Share" icon={<ShareIcon />} />
          <Item text="Inbox" icon={<InboxIcon />} />
          <Item text="Friends" icon={<GroupAddIcon />} />
          <hr className="line" />
          <MenuItem
            onClick={() => Dispatch(ToggleMode())}
            icon={Mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
          >
            <Typography variant="h4">Toggle Theme</Typography>
          </MenuItem>
        </Menu>
      </Sidebar>
      <div
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Outlet
          style={{
            width: "100%",
            height: "100vh",
          }}
        />
      </div>
    </Box>
  );
}

export default Layout;
