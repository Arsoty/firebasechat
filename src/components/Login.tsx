import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import { Button, Container, Grid, TextField } from "@mui/material";
import { signUp, signIn, authWithGoogle } from "../store/actions/authActions";
import "../styles/AuthStyles.scss";

export function Login(): JSX.Element {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form>
      <Grid container direction="column">
        <TextField
          label="Емеил"
          color="primary"
          // value={"babadzaki@gmail.com"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Пароль"
          color="primary"
          // value={"258852"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={() => dispatch(signIn({ email: email, password: password }))}
          variant="contained"
        >
          Войти
        </Button>
      </Grid>
    </form>
  );
}
