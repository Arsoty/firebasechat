import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import { Button, Container, Grid, TextField } from "@mui/material";
import { signUp, signIn, authWithGoogle } from "../store/actions/authActions";
import "../styles/AuthStyles.scss";
import { Registration } from "./Registration";
import { Login } from "./Login";

export function Auth(): JSX.Element {
  const dispatch = useDispatch();

  const [registration, setRegistration] = useState(false);

  return (
    <Container className="authContainer">
      <Grid container direction="column">
        {registration ? <Registration /> : <Login />}

        <Button onClick={() => dispatch(authWithGoogle())} variant="outlined">
          Авторизироваться с помощью Google
        </Button>

        <Button onClick={() => setRegistration(!registration)}>
          {registration ? "Логин" : "Регистрация"}
        </Button>
      </Grid>
    </Container>
  );
}