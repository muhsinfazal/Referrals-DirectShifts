import React, { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import NavBar from "common/NavBar";
import referralsApi from "apis/referrals";
import UserContext from "contexts/UserContext";

import { toast } from "material-react-toastify";

const Refer = () => {
  const currentUser = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await referralsApi.create({
        from_id: currentUser?.id,
        to: data.get("email")
      });
      toast.success("Referred successfully!", { theme: "colored" });
    } catch (err) {
      logger.log(err);
      toast.error("Referral failed!", { theme: "colored" });
    }
  };

  return (
    <>
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "50%" }}
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
    </>
  );
};

export default Refer;
