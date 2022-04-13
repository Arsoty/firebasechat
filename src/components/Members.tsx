import React, { FC, useEffect, useState } from "react";
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
import { baseChatId } from "../store/reducers/chatReducer";
import "../styles/ChatStyles.scss";
import { db, conversationsRef, usersRef, auth } from "../firebase/config";
import { setChat } from "../store/actions/chatActions";
import {
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";

interface MemberInterface {
  uid: string;
}

interface MemberInfoInterface {
  uid: string;
  displayName: string;
  photoUrl: string;
  email: string;
}

export function Members(): JSX.Element {
  const dispatch = useDispatch();

  //тип невер у аутхРедьюсера почему-то.
  const { id }: any = useSelector((state: RootState) => state.auth);
  const { chatId } = useSelector((state: RootState) => state.chat);

  const [members, setMembers] = useState<MemberInfoInterface[]>([]);

  const idGenerator = (id1: string, id2: string): string => {
    let id = id1.substring(0, 5) + id2.substring(0, 5);
    return id.split("").sort().join("");
  };

  const chatChangeHandler = (userId: string): any => {
    let storage: any = [];
    getDocs(conversationsRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const docRef = collection(db, "conversations", doc.id, "member");

        getDocs(docRef).then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            storage.push({ ...doc.data() });
          });
        });

        console.log(storage);

        if (
          storage.every(
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

  useEffect(() => {
    const memberRef = collection(db, "conversations", chatId, "member");

    let storage: any = [];
    onSnapshot(memberRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });

      if (!storage.find((member: MemberInterface) => member.uid === id)) {
        addDoc(memberRef, {
          uid: id,
        });
        // addDoc(usersRef, {
        //   uid: auth.currentUser?.uid,
        //   displayName: auth.currentUser?.displayName || auth.currentUser?.email,
        //   email: auth.currentUser?.email,
        //   photoUrl: auth.currentUser?.photoURL,
        // });
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

      setMembers(membersInfo);

      storage = [];
    });
  }, [chatId]);

  return (
    <Grid
      container
      direction="column"
      sx={{ maxWidth: "25%", backgroundColor: "#1de9b6", height: "90%" }}
    >
      <div
        style={{
          height: "3%",
          backgroundColor: "#9055fa",
          marginTop: "1%",
          textAlign: "center",
          color: "white",
        }}
        onClick={() => dispatch(setChat(baseChatId))}
      >
        Главный чат
      </div>
      {members?.map((el: MemberInfoInterface) => (
        <div
          style={{
            height: "3%",
            backgroundColor: "#0fa680",
            marginTop: "1%",
            textAlign: "center",
          }}
          onClick={() => chatChangeHandler(el.uid)}
        >
          {el.displayName}
        </div>
      ))}
    </Grid>
  );
}
