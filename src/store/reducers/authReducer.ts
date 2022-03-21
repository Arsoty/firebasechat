import { AuthAction, AuthState, SET_USER, SIGN_OUT, SET_ERROR } from "../types";

const initialState: AuthState = {
  user: null,
  authenticated: false,
  error: null,
};

export default function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case SIGN_OUT:
      return {
        user: null,
        authenticated: false,
        error: null,
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
