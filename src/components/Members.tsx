import React, { FC, useEffect, useState } from "react";
import "../styles/MembersStyles.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button, Grid } from "@mui/material";
import { baseChatId } from "../store/reducers/chatReducer";
import "../styles/ChatStyles.scss";
import { db, conversationsRef, usersRef } from "../firebase/config";
import { setChat, setMembers } from "../store/actions/chatActions";
import { basePhotoURL } from "./Header";
import {
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { MemberInfoInterface, MemberInterface } from "../store/types";

export function Members(): JSX.Element {
  const dispatch = useDispatch();

  //тип невер у аутхРедьюсера почему-то.
  const { id }: any = useSelector((state: RootState) => state.auth);
  const { chatId, members } = useSelector((state: RootState) => state.chat);

  const [deleteIt, setDeleteIt] = useState(true);

  const idGenerator = (id1: string, id2: string): string => {
    let id = id1.substring(0, 5) + id2.substring(0, 5);
    return id.split("").sort().join("");
  };

  const chatChangeHandler = (userId: string): void => {
    let storage: any = [];
    getDocs(conversationsRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const docRef = collection(db, "conversations", doc.id, "member");

        getDocs(docRef).then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            storage.push({ ...doc.data() });
          });
        });

        if (
          !storage.every(
            (el: MemberInterface) => el.uid === userId || el.uid === id
          )
        ) {
          dispatch(setChat(idGenerator(userId, id)));
        } else {
          dispatch(setChat(idGenerator(userId, id)));
          const memberRef = collection(
            db,
            "conversations",
            idGenerator(userId, id),
            "member"
          );
          addDoc(memberRef, {
            uid: userId,
          });
        }
      });
    });
  };

  const getMembers = () => {
    const memberRef = collection(db, "conversations", chatId, "member");
    const usersRef = collection(db, "users");

    let storage: any = [];
    onSnapshot(memberRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });

      if (!storage.find((member: MemberInterface) => member.uid === id)) {
        addDoc(memberRef, {
          uid: id,
        });
      }

      let membersInfo: any = [];
      storage.forEach((member: MemberInterface) => {
        const q = query(usersRef, where("uid", "==", member.uid));
        onSnapshot(q, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            membersInfo.push({ ...doc.data() });
          });
        });
      });

      dispatch(setMembers(membersInfo));

      storage = [];
    });
  };

  useEffect(() => {
    getMembers();
  }, [chatId]);

  return (
    <Grid
      container
      direction="column"
      sx={{ maxWidth: "25%", backgroundColor: "#1de9b6", height: "90%" }}
    >
      <div
        onClick={() => dispatch(setChat(baseChatId))}
        className="mainChatButton"
      >
        Главный чат
      </div>
      <Button variant="outlined" onClick={() => setDeleteIt(!deleteIt)}>
        ЭТО НА СЕЙЧАС
      </Button>
      {members?.map((el: MemberInfoInterface) => (
        <div onClick={() => chatChangeHandler(el.uid)} className="memberList">
          <img src={el.photoUrl || basePhotoURL} className="memberAvatar" />
          {el.displayName}
        </div>
      ))}
    </Grid>
  );
}
