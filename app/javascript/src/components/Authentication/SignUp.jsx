import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  Alert,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import CopyRight from "common/CopyRight";
import NavBar from "common/NavBar";
import deviseApi from "apis/devise";
import referralsApi from "apis/referrals";

const SignUp = () => {
  const [formErrors, setFormErrors] = useState();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referrerId = searchParams.get("referrer_id");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await deviseApi.signUp({
        email: data.get("email"),
        password: data.get("password"),
        first_name: data.get("firstName"),
        last_name: data.get("lastName")
      });
      if (referrerId)
        await referralsApi.update(referrerId, {
          from_id: referrerId,
          to: data.get("email")
        });
      history.push("/users/sign_in");
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
              {Object.entries(formErrors?.response?.data?.errors).map(
                ([key, val]) => (
                  <div>{`${key[0].toUpperCase()}${key.slice(1)} ${val}`}</div>
                )
              )}
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => history.push("/users/sign_in")}
                  sx={{ cursor: "pointer" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyRight sx={{ mt: 5 }} />
      </Container>
    </>
  );
};

export default SignUp;
