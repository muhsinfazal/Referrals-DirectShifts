import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";

import SignUp from "components/Authentication/SignUp";
import SignIn from "components/Authentication/SignIn";
import Home from "components/Home";
import Refer from "components/Refer";

import UserContext from "./contexts/UserContext";
import { initializeLogger } from "common/logger";
import { setAuthHeaders } from "apis/axios";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  const theme = createTheme();

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <UserContext.Provider value={props?.current_user}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/refer" component={Refer} />
            <Route exact path="/users/sign_up" component={SignUp} />
            <Route exact path="/users/sign_in" component={SignIn} />
          </Switch>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
