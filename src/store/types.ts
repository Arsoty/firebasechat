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
