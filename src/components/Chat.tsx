import React, { FC } from "react";
import "../styles/ChatStyles.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Button, Container, Grid, TextField } from "@mui/material";
import { db } from "../firebase/config";
import { MsgInterface, TimestampInterface } from "../store/types";
import { getMessages } from "../store/actions/firebaseActions";
import { basePhotoURL } from "./Header";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";

export function Chat(): JSX.Element {
  const dispatch = useDispatch();

  const { id, nickname } = useSelector((state: RootState) => state.auth);
  const { chatId, messages, allUsers, companionId } = useSelector(
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

  useEffect(() => {
    dispatch(getMessages(chatId));
  }, [chatId]);

  return (
    <Grid
      container
      justifyContent="flex-start"
      direction="row"
      className="chatBox"
      sx={{ width: "75%", height: "80%" }}
    >
      {companionId ? (
        <div className="info">
          <img
            className="avatar"
            src={`${
              allUsers.find((el) => el.uid === companionId)?.photoUrl ||
              basePhotoURL
            }`}
          ></img>
          <span className="nickname">
            {allUsers.find((el) => el.uid === companionId)?.displayName}
          </span>
        </div>
      ) : (
        <div className="infoDefault">Главный чат</div>
      )}
      <Grid container className="msgAreaMain">
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
      <Grid
        container
        flexDirection="row"
        justifyContent="center"
        className="chatContainer"
      >
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
    </Grid>
  );
}
