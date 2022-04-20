import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

import { Button, Container, Grid, TextField } from "@mui/material";
import { signUp, signIn, authWithGoogle } from "../store/actions/authActions";
import "../styles/AuthStyles.scss";

export function Registration(): JSX.Element {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  const setProfile = (): void => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: null,
      })
        .then(() => {})
        .catch((error) => {});
    }
  };

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
        <TextField
          label="Никнейм"
          color="primary"
          onChange={(e) => setNickname(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={() => {
            dispatch(
              signUp({ email: email, password: password, nickname: nickname })
            );
            setNickname("");
          }}
        >
          Зарегистрироваться
        </Button>
      </Grid>
    </form>
  );
}
