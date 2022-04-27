import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  ChatAction,
  MemberInfoInterface,
  MemberInterface,
  MsgInterface,
  SET_CHAT,
  SET_MEMBERS,
  SET_MESSAGES,
  SET_ALL_USERS,
  SET_COMPANION,
} from "../types";
import { db } from "../../firebase/config";
import { Dispatch } from "redux";

export const getAllUsers = () => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      const usersRef = collection(db, "users");
      let storage: any = [];

      onSnapshot(usersRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          storage.push({ ...doc.data() });
        });

        dispatch({ type: SET_ALL_USERS, payload: storage });

        storage = [];
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const getMessages = (chatId: string) => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      const messageRef = collection(db, "conversations", chatId, "message");
      const q = query(messageRef, orderBy("timestamp"));
      let storage: any = [];
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          storage.push({ ...doc.data() });
        });

        dispatch({ type: SET_MESSAGES, payload: storage });

        storage = [];
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const getMembers = (chatId: string, id: string) => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
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

        dispatch({ type: SET_MEMBERS, payload: membersInfo });

        storage = [];
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
