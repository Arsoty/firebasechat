import React, { FC, useEffect, useState } from "react";
import "../styles/MembersStyles.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Grid } from "@mui/material";
import { baseChatId } from "../store/reducers/chatReducer";
import "../styles/ChatStyles.scss";
import { db } from "../firebase/config";
import { setChat, setCompanion } from "../store/actions/chatActions";
import { basePhotoURL } from "./Header";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { MemberInfoInterface, MemberInterface } from "../store/types";
import { getAllUsers, getMembers } from "../store/actions/firebaseActions";

export function Members(): JSX.Element {
  const savedMessagesImg =
    "https://forteams.co/wp-content/uploads/2020/07/apps.22113.327126b2-6c96-4509-a2aa-f784331ea9ef.352176c3-a0a6-4f4d-b7ec-2deda738909a.c039d960-f794-4dab-a792-d77f46e9b7df.png";

  const dispatch = useDispatch();

  //тип невер у аутхРедьюсера почему-то.
  const { id }: any = useSelector((state: RootState) => state.auth);
  const { chatId, allUsers } = useSelector((state: RootState) => state.chat);

  const [activeChat, setActiveChat] = useState("");

  const idGenerator = (id1: string, id2: string): string => {
    let id = id1.substring(0, 5) + id2.substring(0, 5);
    return id.split("").sort().join("");
  };

  const chatChangeHandler = (userId: string): void => {
    setActiveChat(userId);

    dispatch(setCompanion(userId));

    const newChatId: string = idGenerator(userId, id);

    dispatch(setChat(newChatId));

    const memberRef = collection(db, "conversations", newChatId, "member");

    let storage: any = [];

    onSnapshot(memberRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });

      if (!storage.find((el: MemberInterface) => el.uid === userId)) {
        addDoc(memberRef, {
          uid: userId,
        });
      }

      storage = [];
    });
  };

  useEffect(() => {
    dispatch(getMembers(chatId, id));
    dispatch(getAllUsers());
  }, [chatId]);

  return (
    <Grid container direction="column" className="membersBox">
      <div
        onClick={() => {
          dispatch(setChat(baseChatId));
          dispatch(setCompanion(""));
          setActiveChat("");
        }}
        className="mainChatButton"
      >
        Главный чат
      </div>
      {allUsers?.map((el: MemberInfoInterface) =>
        el.uid === id ? (
          <div
            onClick={() => chatChangeHandler(el.uid)}
            className={
              el.uid === activeChat ? "memberListActive" : "memberList"
            }
          >
            <img src={savedMessagesImg} className="memberAvatar" />
            {"Сохраненные сообщения"}
          </div>
        ) : (
          <div
            onClick={() => chatChangeHandler(el.uid)}
            className={
              el.uid === activeChat ? "memberListActive" : "memberList"
            }
          >
            <img src={el.photoUrl || basePhotoURL} className="memberAvatar" />
            {el.displayName}
          </div>
        )
      )}
    </Grid>
  );
}
