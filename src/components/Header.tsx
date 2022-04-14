import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";

import { baseChatId } from "../store/reducers/chatReducer";
import { setChat } from "../store/actions/chatActions";

import { signOutHandler } from "../store/actions/authActions";
import { AppBar, Button, Grid, Toolbar } from "@mui/material";

import "../styles/HeaderStyles.scss";

export const basePhotoURL: string =
  "https://cdn-icons-png.flaticon.com/512/17/17004.png";

const Header: FC = () => {
  const dispatch = useDispatch();
  const { authenticated, nickname, photoURL } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Grid container justifyContent="flex-end" alignItems={"center"}>
          {authenticated ? (
            <img src={photoURL || basePhotoURL} className="avatar"></img>
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
