import React, { FC } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Input,
  Toolbar,
  TextField,
} from "@mui/material";
import "../styles/ChatStyles.scss";
import { Members } from "./Members";
import { Workspace } from "./Workspace";

export function Chat(): JSX.Element {
  return (
    <Grid container direction="row" sx={{ height: "100vh" }}>
      <Workspace />
    </Grid>
  );
}
