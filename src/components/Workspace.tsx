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

import { db } from "../firebase/config";
import {
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";

interface MsgInterface {
  text: string;
  authorId: string;
  timestamp: number;
}

const messageRef = collection(
  db,
  "conversations",
  "PSmzGOBFG0sMFERLBIrS",
  "message"
);

export function Workspace(): JSX.Element {
  const { id } = useSelector((state: RootState) => state.auth);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<MsgInterface[]>([]);

  const q = query(messageRef, orderBy("timestamp"));

  useEffect(() => {
    let storage: any = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });
      setMessages(storage);
      storage = [];
    });
  });

  return (
    <>
      <Grid
        container
        justifyContent="flex-end"
        direction="column"
        sx={{ width: "75%", height: "90%" }}
      >
        <Grid container sx={{ height: "90%" }}>
          <div
            style={{
              padding: "5%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            {messages.map((el: MsgInterface) =>
              el.authorId === id ? (
                <div
                  style={{
                    backgroundColor: "blue",
                    alignSelf: "flex-end",
                    minWidth: "10%",
                    maxWidth: "30%",
                    height: "5%",
                  }}
                >
                  {el.text}
                </div>
              ) : (
                <span
                  style={{
                    backgroundColor: "red",
                    minWidth: "10%",
                    maxWidth: "30%",
                    height: "5%",
                  }}
                >
                  {el.text}
                </span>
              )
            )}
          </div>
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
              onClick={() =>
                addDoc(messageRef, {
                  text: text,
                  authorId: id,
                  timestamp: serverTimestamp(),
                })
              }
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
}
