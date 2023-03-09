import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ThemeSettings } from "../Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Home from "./components/Diary/Home";
import Add from "./components/Diary/Add";
import { useMemo } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import Layout from "./components/Layout";
import Main from "./components/Diary/Main";
import { selectAuth } from "../../Global/GlobalSlice";
import View from "./components/Diary/View";
import Edit from "./components/Diary/Edit";
import { Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Password from "./components/Diary/Password";
import F2A from "./components/F2A";
import SignUp from "./components/Login/SignUp";
const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectAuth);
  console.log("Navigate Attempt");
  if (!user) {
    console.log("Navigate");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export function App() {
  const mode = useSelector((state) => state.Global.mode);
  const theme = useMemo(() => createTheme(ThemeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to={"/home"} />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/f2a" element={<F2A />} />
              <Route path="/mydiary" element={<Home />}>
                <Route path="/mydiary/All" element={<Main />}></Route>
                <Route path="/mydiary/Password" element={<Password />}></Route>
                <Route path="/mydiary/View/" element={<View />}></Route>
                <Route path="/mydiary/Edit/" element={<Edit />}></Route>
                <Route path="/mydiary/add" element={<Add />}></Route>
              </Route>
              <Route path="*"></Route>
            </Route>
          </Routes>
        </ProSidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
