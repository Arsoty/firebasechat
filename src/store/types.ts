export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_ERROR = "SET_ERROR";

export interface User {
  nickname: string | null;
  email: string | null;
  id: string;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  error: string | null;
  nickname: string;
  id: string;
}

export interface SignUpData {
  nickname: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type AuthAction = SetUserAction | SignOutAction | SetErrorAction;

export const SET_CHAT = "SET_CHAT";
export const SET_MEMBERS = "SET_MEMBERS";
export const SET_MESSAGES = "SET_MESSAGES";

export interface ChatState {
  chatId: string;
  members: MemberInfoInterface[];
  messages: MsgInterface[];
}

export interface SetChatAction {
  type: typeof SET_CHAT;
  payload: string;
}

export interface SetMembersAction {
  type: typeof SET_MEMBERS;
  payload: MemberInfoInterface[];
}

export interface SetMessagesAction {
  type: typeof SET_MESSAGES;
  payload: MsgInterface[];
}

export type ChatAction = SetChatAction | SetMembersAction | SetMessagesAction;

export interface TimestampInterface {
  seconds: number;
  nanoseconds: number;
}

export interface MsgInterface {
  text: string;
  authorId: string;
  authorName: string;
  timestamp: TimestampInterface;
}

export interface MemberInterface {
  uid: string;
}

export interface MemberInfoInterface {
  uid: string;
  displayName: string;
  photoUrl: string;
  email: string;
}
