import React, { FC } from "react";
import { Grid } from "@mui/material";
import { Members } from "./Members";
import { Chat } from "./Chat";
import "../styles/WorkspaceStyles.scss";

export function Workspace(): JSX.Element {
  return (
    <Grid container direction="row" className="mainBox">
      <Chat />
      <Members />
    </Grid>
  );
}
