import React, { useEffect, useState, createContext } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import SignUp from "components/Authentication/SignUp";
import SignIn from "components/Authentication/SignIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserContext from "./contexts/UserContext";
import NavBar from "./common/NavBar";
import { Box, CircularProgress } from "@mui/material";

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
    <UserContext.Provider value={props?.authorized}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <NavBar />
                  <div>Home</div>
                </>
              )}
            />
            <Route exact path="/users/sign_up" component={SignUp} />
            <Route exact path="/users/sign_in" component={SignIn} />
          </Switch>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
