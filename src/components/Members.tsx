import React, { FC, useEffect, useState } from "react";
import "../styles/MembersStyles.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button, Grid } from "@mui/material";
import { baseChatId } from "../store/reducers/chatReducer";
import "../styles/ChatStyles.scss";
import { db, conversationsRef, usersRef } from "../firebase/config";
import { setAllUsers, setChat, setMembers } from "../store/actions/chatActions";
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
  const { chatId, allUsers, members } = useSelector(
    (state: RootState) => state.chat
  );

  // const [deleteIt, setDeleteIt] = useState(true);
  const [activeChat, setActiveChat] = useState("");

  const idGenerator = (id1: string, id2: string): string => {
    let id = id1.substring(0, 5) + id2.substring(0, 5);
    return id.split("").sort().join("");
  };

  const savedMessagesImg =
    "https://forteams.co/wp-content/uploads/2020/07/apps.22113.327126b2-6c96-4509-a2aa-f784331ea9ef.352176c3-a0a6-4f4d-b7ec-2deda738909a.c039d960-f794-4dab-a792-d77f46e9b7df.png";

  const chatChangeHandler = (userId: string): void => {
    setActiveChat(userId);

    const newChatId: string = idGenerator(userId, id);

    dispatch(setChat(newChatId));

    const memberRef = collection(db, "conversations", newChatId, "member");

    let storage: any = [];

    getDocs(memberRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });
    });

    console.log(storage);

    if (
      storage.every((el: MemberInterface) => el.uid === userId || el.uid === id)
    ) {
      addDoc(memberRef, {
        uid: userId,
      });
    }
  };

  const getAllUsers = () => {
    const usersRef = collection(db, "users");
    let storage: any = [];

    onSnapshot(usersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });

      dispatch(setAllUsers(storage));

      storage = [];
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
    getAllUsers();
  }, [chatId]);

  return (
    <Grid container direction="column" className="membersBox">
      <div
        onClick={() => {
          dispatch(setChat(baseChatId));
          setActiveChat("");
        }}
        className="mainChatButton"
      >
        Главный чат
      </div>
      {/* <Button variant="outlined" onClick={() => setDeleteIt(!deleteIt)}>
        ЭТО НА СЕЙЧАС
      </Button> */}
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
