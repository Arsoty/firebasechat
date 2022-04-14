import { ChatAction, ChatState, SET_CHAT, SET_MEMBERS, SET_MESSAGES } from "../types";

export const baseChatId: string = "OgxmGU8RvpH8yOpAanHj";

const initialState: ChatState = {
  chatId: baseChatId,
  members: [],
  messages: [],
};

export default function chatReducer(state = initialState, action: ChatAction) {
  switch (action.type) {
    case SET_CHAT:
      return {
        ...state,
        chatId: action.payload,
      };
    case SET_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
}
