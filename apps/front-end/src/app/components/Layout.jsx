import { Box } from "@mui/system";
import React, { useState, createContext } from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Tooltip } from "@mui/material";
import { selectAuth } from "../../../Global/GlobalSlice";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import { ToggleMode, selectMode } from "../../../Global/GlobalSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoginIcon from "@mui/icons-material/Login";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import SecurityIcon from "@mui/icons-material/Security";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InboxIcon from "@mui/icons-material/Inbox";
import ShareIcon from "@mui/icons-material/Share";
import ArticleIcon from "@mui/icons-material/Article";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";
export const collapsedContext = createContext();
export const baseUrl = createContext();
function CheckActive(to, pathname, text) {
  const location = useLocation();
  if (to !== undefined) {
    return location.pathname.includes(to) ? true : false;
  } else {
    return pathname === text.replace(" ", "").toLowerCase() ? true : false;
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function Layout() {
  console.log(process.env.NODE_ENV);
  const { collapseSidebar } = useProSidebar();
  const Theme = useTheme();
  const AuthStatue = useSelector(selectAuth);
  const Mode = useSelector(selectMode);
  const Dispatch = useDispatch();
  const [collapsed, Setcollapsed] = useState(true);
  const [open, Setopen] = useState(false);
  const [openDiary, SetopenDiary] = useState(false);
  function Item({ icon, text, to, variant, padding, onClick }) {
    const location = useLocation();
    let pathname = location.pathname.split("/")[1].toLowerCase();
    return (
      <MenuItem
        style={{
          marginTop: "5px",
          marginBlock: "5px",
          paddingLeft: collapsed === false ? padding : "",
          color: "$fff",
        }}
        icon={icon}
        component={
          <Link to={to || `/${text.replace(" ", "").toLowerCase()}`} />
        }
        active={CheckActive(to, pathname, text)}
        onClick={() => onClick}
      >
        <Typography variant={variant || "h4"}>{text}</Typography>
      </MenuItem>
    );
  }
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
        ".ps-open #submenuColor": {
          color: collapsed === false ? Theme.palette.Text.Title : "",
        },
        "*": {
          trasnition: "height 30ms",
        },
        ".css-ewdv3l": {
          background: Theme.palette.background.main,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: AuthStatue === true ? "space-between" : "center",
        },
        ".ps-open": {
          background: Theme.palette.background.main,
        },
        ".ps-submenu-content": {
          background: Theme.palette.background.main,
        },
      }}
    >
      <Sidebar
        backgroundColor={Theme.palette.background.main}
        defaultCollapsed={AuthStatue === true ? "true" : ""}
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
          {AuthStatue === true ? (
            <>
              <MenuItem
                icon={<MenuIcon />}
                onClick={() => {
                  Setcollapsed(!collapsed);
                  Setopen(false);
                  SetopenDiary(false);
                  collapseSidebar();
                }}
              ></MenuItem>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>
                  <hr className="line" />
                  <Item text="Home" icon={<HomeIcon />} to="/Home" />
                  <SubMenu
                    label={<Typography variant="h4">"Diary"</Typography>}
                    onClick={() => SetopenDiary(!openDiary)}
                    open={openDiary}
                    icon={<LibraryBooksIcon />}
                    id="submenuColor"
                  >
                    <Item
                      text="My Diary"
                      icon={<ArticleIcon />}
                      to="/mydiary/all"
                      variant="h5"
                      padding={collapsed === true ? "25px" : "40px"}
                    />
                    <Item
                      text="New Diary"
                      icon={<AddBoxIcon />}
                      to="/mydiary/add"
                      variant="h5"
                      padding={collapsed === true ? "25px" : "40px"}
                    />
                  </SubMenu>
                  <Item text="Share" icon={<ShareIcon />} />
                  <Item text="Inbox" icon={<InboxIcon />} />
                  <Item text="Friends" icon={<GroupAddIcon />} />
                  <hr className="line" />

                  <SubMenu
                    label={<Typography variant="h4">Settings</Typography>}
                    onClick={() => Setopen(!open)}
                    open={open}
                    id="submenuColor"
                    icon={<SettingsIcon />}
                  >
                    <Item
                      text="F2A"
                      icon={<SecurityIcon />}
                      variant="h5"
                      padding={collapsed === true ? "25px" : "40px"}
                    />
                    <MenuItem
                      onClick={() => Dispatch(ToggleMode())}
                      style={{
                        paddingLeft: collapsed === true ? "25px" : "40px",
                      }}
                      icon={
                        Mode === "light" ? <LightModeIcon /> : <DarkModeIcon />
                      }
                    >
                      <Typography variant="h5">Toggle Theme</Typography>
                    </MenuItem>
                  </SubMenu>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <hr className="line" />
                <Item text="Login" icon={<LoginIcon />} />
                <Item text="Sign up" icon={<AddCircleOutlineIcon />} />
                <hr className="line" />
              </div>
            </>
          )}
        </Menu>
      </Sidebar>
      <div
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <baseUrl.Provider
          value={
            process.env.NODE_ENV === "production"
              ? "https://diarybackend.onrender.com"
              : "http://localhost:9000"
          }
        >
          <collapsedContext.Provider value={collapsed}>
            <Outlet
              style={{
                width: "100%",
                height: "100vh",
              }}
            />
          </collapsedContext.Provider>
        </baseUrl.Provider>
      </div>
    </Box>
  );
}

export default Layout;
