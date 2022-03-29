import React, { FC, useState } from "react";
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
import { db, conversationsRef } from "../firebase/config";
import { getDocs } from "firebase/firestore";

export function Members(): JSX.Element {
  const [members, setMembers] = useState([]);
  getDocs(conversationsRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      setMembers(...([doc.data().members] as const));
    });
  });

  return (
    <Grid
      container
      direction="column"
      sx={{ maxWidth: "25%", backgroundColor: "yellow", height: "90%" }}
    >
      {members?.map((el: number) => (
        <div>{el}</div>
      ))}
    </Grid>
  );
}
