import { Dispatch } from "redux";
import {
  ChatAction,
  SET_CHAT,
  SET_COMPANION,
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

export const setCompanion = (companionId: string) => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      dispatch({ type: SET_COMPANION, payload: companionId });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
