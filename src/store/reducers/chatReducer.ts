import {
  ChatAction,
  ChatState,
  SET_CHAT,
  SET_MEMBERS,
  SET_MESSAGES,
  SET_ALL_USERS,
  SET_COMPANION,
} from "../types";

export const baseChatId: string = "FWAnvPnTiktYUx2fil2J";

const initialState: ChatState = {
  chatId: baseChatId,
  members: [],
  messages: [],
  allUsers: [],
  companionId: "",
};

export default function chatReducer(state = initialState, action: ChatAction) {
  switch (action.type) {
    case SET_CHAT:
      return {
        ...state,
        chatId: action.payload,
      };
    case SET_ALL_USERS:
      return { ...state, allUsers: action.payload };
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
    case SET_COMPANION:
      return {
        ...state,
        companionId: action.payload,
      };
    default:
      return state;
  }
}
