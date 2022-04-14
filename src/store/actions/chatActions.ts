import { ActionCodeOperation } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../firebase/config";
import {
  ChatAction,
  MemberInfoInterface,
  MemberInterface,
  MsgInterface,
  SET_CHAT,
  SET_MEMBERS,
  SET_MESSAGES,
} from "../types";

export const setChat = (chatId: string) => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      dispatch({ type: SET_CHAT, payload: chatId });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const setMembers = (members: MemberInfoInterface[]) => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      dispatch({ type: SET_MEMBERS, payload: members });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

export const setMessages = (messages: MsgInterface[]) => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      dispatch({ type: SET_MESSAGES, payload: messages });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
