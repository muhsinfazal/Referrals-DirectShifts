import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import NavBar from "common/NavBar";
import UserContext from "contexts/UserContext";
import referralsApi from "apis/referrals";
import { getUtcTime } from "./utils";

const Home = () => {
  const currentUser = useContext(UserContext);
  const [tableData, setTableData] = useState([]);

  const fetchReferrals = async () => {
    try {
      const { data } = await referralsApi.show(currentUser?.id);
      setTableData(data.referrals);
    } catch (err) {
      logger.log(err);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: 4 }}
          >
            My Referrals
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Referee</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Referred On</TableCell>
                </TableRow>
              </TableHead>
              {!!tableData.length ? (
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.to}
                      </TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        {getUtcTime(row.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={3} align="center">
                      No Data
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default Home;
