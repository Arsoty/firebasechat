import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import "../styles/ChatStyles.scss";
import { db, conversationsRef, usersRef, auth } from "../firebase/config";
import {
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getDoc,
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
  const { id } = useSelector((state: RootState) => state.auth);
  const { chatId } = useSelector((state: RootState) => state.chat);

  const [members, setMembers] = useState<MemberInfoInterface[]>([]);

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

        if (
          !storage.every(
            (el: MemberInterface) => el.uid === userId || el.uid === id
          )
        ) {
          addDoc(conversationsRef, { identificator: `${userId}${id}` });

          const q = query(
            conversationsRef,
            where("identificator", "==", `${userId}${id}`)
          );

          // const docRef = doc(db, "conversations", where("identificator", "==", `${userId}${id}`));

          // add(q);
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
      sx={{ maxWidth: "25%", backgroundColor: "yellow", height: "90%" }}
    >
      {members?.map((el: MemberInfoInterface) => (
        <div onClick={() => chatChangeHandler(el.uid)}>{el.displayName}</div>
      ))}
    </Grid>
  );
}
