import React, { FC, useEffect } from "react";
import { useState } from "react";
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

import { Members } from "./Members";

import { db, messageRef } from "../firebase/config";
import { getDocs, addDoc } from "firebase/firestore";

export const Workspace: FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const messages: any = [];
  const [text, setText] = useState("");

  getDocs(messageRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      messages.push(Object.values({ ...doc.data() })[0]);
    });
  });

  console.log(messages);

  return (
    <>
      <Grid
        container
        justifyContent="flex-end"
        direction="column"
        sx={{ width: "75%", height: "90%" }}
      >
        <Grid container sx={{ height: "90%" }}>
          <div>
            {messages.map((message: any) => (
              <div>{message}</div>
            ))}
          </div>
          {/* {messages?.map((el: number) => (
            <div>{el}</div>
          ))} */}
        </Grid>
        <Container className="chatContainer">
          <Grid container justifyContent="flex-start">
            <TextField
              onChange={(e) => setText(e.target.value)}
              label="Сообщение"
              color="primary"
              className="msgInput"
            />
            <Button
              onClick={() => addDoc(messageRef, { text: text })}
              variant={"contained"}
            >
              Отправить
            </Button>
          </Grid>
        </Container>
      </Grid>
      <Members />
    </>
  );
};
