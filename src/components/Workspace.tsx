import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import { AppBar, Button, Container, Grid, Input, Toolbar } from "@mui/material";

const Auth: FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Container>
      <Grid container justifyContent="center"></Grid>
    </Container>
  );
};

export default Auth;
