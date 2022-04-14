import React, { FC } from "react";
import { Grid } from "@mui/material";
import { Members } from "./Members";
import { Chat } from "./Chat";

export function Workspace(): JSX.Element {
  return (
    <Grid container direction="row" sx={{ height: "100vh" }}>
      <Chat />
      <Members />
    </Grid>
  );
}
