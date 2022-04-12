import { ActionCodeOperation } from "firebase/auth";
import { Dispatch } from "redux";
import { ChatAction, SET_CHAT } from "../types";

export const setChat = (chatId: string) => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      dispatch({ type: SET_CHAT, payload: chatId });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
