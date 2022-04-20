import { AuthAction, AuthState, SET_USER, SIGN_OUT, SET_ERROR } from "../types";
import { auth } from "../../firebase/config";

const initialState: AuthState = {
  user: null,
  authenticated: false,
  error: null,
  nickname: "",
  id: "",
};

export default function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        nickname: auth.currentUser?.displayName,
        id: auth.currentUser?.uid,
        photoURL: auth.currentUser?.photoURL,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        error: null,
        nickname: "",
        id: "",
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
