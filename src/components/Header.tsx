import React, { FC, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import {
  authStateChangedHandler,
  signOutHandler,
} from "../store/actions/authActions";
import { AppBar, Button, Grid, Toolbar } from "@mui/material";

const Header: FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Grid container justifyContent="flex-end">
          {authenticated ? (
            <Button
              onClick={() => (
                dispatch(signOutHandler()),
                dispatch(authStateChangedHandler())
              )}
              variant="contained"
            >
              Выйти
            </Button>
          ) : (
            <Link to={"/auth"}>
              <Button variant="contained">Войти</Button>
            </Link>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
