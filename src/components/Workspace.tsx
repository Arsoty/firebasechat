import React, { FC } from "react";
import { Grid } from "@mui/material";
import { Members } from "./Members";
import { Chat } from "./Chat";
import Header from "./Header";
import "../styles/WorkspaceStyles.scss";

export function Workspace(): JSX.Element {
  return (
    <Grid container direction="row" className="mainBox">
      <Header />
      <Chat />
      <Members />
    </Grid>
  );
}
