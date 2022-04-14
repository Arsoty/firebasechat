import React, { FC } from "react";
import "../styles/ChatStyles.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Button, Container, Grid, TextField } from "@mui/material";
import { db } from "../firebase/config";
import { MsgInterface, TimestampInterface } from "../store/types";
import { setMessages } from "../store/actions/chatActions";
import {
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";

export function Chat(): JSX.Element {
  const dispatch = useDispatch();

  const { id, nickname } = useSelector((state: RootState) => state.auth);
  const { chatId, messages, members } = useSelector(
    (state: RootState) => state.chat
  );

  const [text, setText] = useState("");

  const messageRef = collection(db, "conversations", chatId, "message");

  const toDateTime = (timestamp: TimestampInterface) => {
    let t = new Date(Date.UTC(1970, 0, 1));
    t.setSeconds(timestamp?.seconds);
    return t.toLocaleString("ru-RU");
  };

  const sendMesssge = (): void => {
    addDoc(messageRef, {
      text: text,
      authorId: id,
      authorName: nickname,
      timestamp: serverTimestamp(),
    });
  };

  const keyDownHandler = (event: any): void => {
    if (event.key === "Enter" || event.key === "NumEnter") {
      sendMesssge();
      setText("");
    }
  };

  const getMessages = () => {
    const q = query(messageRef, orderBy("timestamp"));
    let storage: any = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });
      dispatch(setMessages(storage));
      storage = [];
    });
  };

  useEffect(() => {
    getMessages();
  }, [chatId]);

  return (
    <Grid
      container
      justifyContent="flex-end"
      direction="column"
      sx={{ width: "75%", height: "90%" }}
    >
      {members.length < 2 ? (
        <span>
          <img src={members.find((el) => el.uid !== id)?.photoUrl}></img>
          <span>{members.find((el) => el.uid !== id)?.displayName}</span>
        </span>
      ) : (
        <div>FFFFFFFF</div>
      )}
      <Grid container sx={{ height: "90%" }}>
        <div className="msgArea">
          {messages.map((el: MsgInterface) =>
            el.authorId === id ? (
              <div className="userMsg">
                {el.text}
                <div>{el.authorName}</div>
                <div>{toDateTime(el.timestamp)}</div>
              </div>
            ) : (
              <span className="otherMsg">
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
              sendMesssge();
              setText("");
            }}
            variant={"contained"}
          >
            Отправить
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
}
