import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import {
  AppBar,
  Button,
  Container,
  Grid,
  Input,
  Toolbar,
  TextField,
} from "@mui/material";
import { signUp, signIn, authWithGoogle } from "../store/actions/authActions";
import "../styles/AuthStyles.scss";

export function Auth(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const [p, setP] = useState("");
  const [e, setE] = useState("");

  console.log(authenticated);

  return (
    <Container className="authContainer">
      <form>
        <Grid container direction="column">
          <TextField
            label="Емеил"
            color="primary"
            // value={"babadzaki@gmail.com"}
            onChange={(e) => setE(e.target.value)}
          />
          <TextField
            label="Пароль"
            color="primary"
            // value={"258852"}
            onChange={(e) => setP(e.target.value)}
          />
          <Button
            onClick={() => dispatch(signIn({ email: e, password: p }))}
            variant="outlined"
          >
            ПРОСТО
          </Button>
          <Button onClick={() => dispatch(authWithGoogle())} variant="outlined">
            ГУГЛ
          </Button>
          ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          <Button
            variant="outlined"
            onClick={() =>
              dispatch(signUp({ email: e, password: p, nickname: "Joshua" }))
            }
          >
            ЗАРЕГАТЬ
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
