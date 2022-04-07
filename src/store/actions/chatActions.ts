import { Dispatch } from "redux";
import { ChatAction, SET_CHAT } from "../types";

export const signUp = (userId: string) => {
  return async (dispatch: Dispatch<ChatAction>) => {
    try {
      dispatch({ type: SET_CHAT, payload: "2" });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};
