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
import { db, conversationsRef } from "../firebase/config";
import { getDocs, onSnapshot, collection, addDoc } from "firebase/firestore";

interface MemberInterface {
  uid: string;
}

const memberRef = collection(
  db,
  "conversations",
  "PSmzGOBFG0sMFERLBIrS",
  "member"
);

export function Members(): JSX.Element {
  const { id } = useSelector((state: RootState) => state.auth);

  const [members, setMembers] = useState<MemberInterface[]>([]);

  useEffect(() => {
    let storage: any = [];
    onSnapshot(memberRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        storage.push({ ...doc.data() });
      });
      setMembers(storage);
      console.log(storage);
      if (!storage.map((member: MemberInterface) => member.uid).includes(id)) {
        addDoc(memberRef, {
          uid: id,
        });
      }
      storage = [];
    });
  }, []);

  return (
    <Grid
      container
      direction="column"
      sx={{ maxWidth: "25%", backgroundColor: "yellow", height: "90%" }}
    >
      {members?.map((el: MemberInterface) => (
        <div>{el.uid}</div>
      ))}
    </Grid>
  );
}
