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

interface TimestampInterface {
  seconds: number;
  nanoseconds: number;
}

interface MsgInterface {
  text: string;
  authorId: string;
  authorName: string;
  timestamp: TimestampInterface;
}

export function Workspace(): JSX.Element {
  const { id, nickname } = useSelector((state: RootState) => state.auth);
  const { chatId } = useSelector((state: RootState) => state.chat);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<MsgInterface[]>([]);

  const messageRef = collection(db, "conversations", chatId, "message");

  const toDateTime = (timestamp: TimestampInterface) => {
    let t = new Date(Date.UTC(1970, 0, 1));
    console.log(timestamp);
    t.setSeconds(timestamp?.seconds);
    return t.toLocaleString("ru-RU");
  };

  const keyDownHandler = (event: any): void => {
    if (event.key === "Enter" || event.key === "NumEnter") {
      addDoc(messageRef, {
        text: text,
        authorId: id,
        authorName: nickname,
        timestamp: serverTimestamp(),
      });
      setText("");
    }
  };

  useEffect(() => {
    const q = query(messageRef, orderBy("timestamp"));
    let storage: any = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });
      setMessages(storage);
      storage = [];
    });
  }, [chatId]);

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
                    backgroundColor: "#9055fa",
                    alignSelf: "flex-end",
                    minWidth: "10%",
                    maxWidth: "30%",
                    height: "4%",
                    borderRadius: "5px",
                  }}
                >
                  {el.text}
                  <div>{el.authorName}</div>
                  <div>{toDateTime(el.timestamp)}</div>
                </div>
              ) : (
                <span
                  style={{
                    backgroundColor: "#1de9b6",
                    minWidth: "10%",
                    maxWidth: "30%",
                    height: "4%",
                    borderRadius: "5px",
                  }}
                >
                  {el.text}
                  <div>{el.authorName}</div>
                  <div>{toDateTime(el.timestamp)}</div>
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
              onKeyDown={keyDownHandler}
              value={text}
            />
            <Button
              onClick={() => {
                addDoc(messageRef, {
                  text: text,
                  authorId: id,
                  authorName: nickname,
                  timestamp: serverTimestamp(),
                });
                setText("");
              }}
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
