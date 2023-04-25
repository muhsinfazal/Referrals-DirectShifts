import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import CopyRight from "common/CopyRight";
import NavBar from "common/NavBar";
import deviseApi from "apis/devise";

const SignIn = () => {
  const [formErrors, setFormErrors] = useState();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await deviseApi.signIn({
        email: data.get("email"),
        password: data.get("password")
      });
      location.reload();
    } catch (err) {
      setFormErrors(err);
      logger.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {formErrors && (
            <Alert sx={{ mb: 2 }} severity="error">
              {formErrors?.response?.data?.error}
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => history.push("/users/sign_up")}
                  sx={{ cursor: "pointer" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyRight sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default SignIn;
