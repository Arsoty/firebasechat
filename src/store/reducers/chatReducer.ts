import { ChatAction, ChatState, SET_CHAT } from "../types";

const initialState: ChatState = {
  chatId: "PSmzGOBFG0sMFERLBIrS",
};

export default function chatReducer(state = initialState, action: ChatAction) {
  switch (action.type) {
    case SET_CHAT:
      return {
        ...state,
        chatId: action.payload,
      };
    default:
      return state;
  }
}
