import React, { FC, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import { auth } from "../firebase/config";
import { baseChatId } from "../store/reducers/chatReducer";
import { setChat } from "../store/actions/chatActions";

import { signOutHandler } from "../store/actions/authActions";
import { AppBar, Button, Grid, Toolbar } from "@mui/material";

const Header: FC = () => {
  const dispatch = useDispatch();
  const { authenticated, nickname, photoURL } = useSelector(
    (state: RootState) => state.auth
  );

  const basePhotoURL: string =
    "https://cdn-icons-png.flaticon.com/512/17/17004.png";

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Grid container justifyContent="flex-end" alignItems={"center"}>
          {authenticated ? (
            <img
              src={photoURL || basePhotoURL}
              style={{ borderRadius: "50%", height: "50px", width: "50px" }}
            ></img>
          ) : (
            <></>
          )}

          <div>{nickname}</div>
          {authenticated ? (
            <Button
              onClick={() => {
                dispatch(signOutHandler());
                dispatch(setChat(baseChatId));
              }}
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
