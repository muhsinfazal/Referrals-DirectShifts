import React, { useContext } from "react";
import { Form, Formik } from "formik";
import { toast } from "material-react-toastify";
import { Button, TextField, Box, Typography } from "@mui/material/Button";

import NavBar from "common/NavBar";
import UserContext from "contexts/UserContext";
import referralsApi from "apis/referrals";
import { emailValidationShema } from "./validations";

const Refer = () => {
  const currentUser = useContext(UserContext);

  const handleSubmit = async (values) => {
    try {
      await referralsApi.create({
        from_id: currentUser?.id,
        to: values.email
      });
      toast.success("Referred successfully!", { theme: "colored" });
    } catch (err) {
      logger.log(err);
      toast.error("Referral failed!", { theme: "colored" });
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={emailValidationShema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <NavBar />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Refer a friend
            </Typography>
            <Box sx={{ mt: 1, width: "50%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Refer
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Refer;
