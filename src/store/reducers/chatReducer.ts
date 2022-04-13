import { ChatAction, ChatState, SET_CHAT } from "../types";

export const baseChatId: string = "OgxmGU8RvpH8yOpAanHj";

const initialState: ChatState = {
  chatId: baseChatId,
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
