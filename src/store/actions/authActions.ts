import { ThunkAction } from "redux-thunk";
import {
  SignUpData,
  AuthAction,
  SET_USER,
  SIGN_OUT,
  SET_LOADING,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
  User,
  SignInData,
} from "../types";
import { RootState } from "..";
import firebase from "../../firebase/config";

export const signIn = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispacth) => {
    try {
      console.log(1);
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
    } catch (e: any) {
      onError();
      dispacth(setError(e.message));
    }
  };
};

export const authWithGoogle = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return async (dispatch) => {
    try {
      console.log(1);
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => console.log(res));
    } catch (e: any) {
      dispatch({ type: SET_ERROR, payload: e.message });
    }
  };
};

export const signUp = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      if (res.user) {
        const userData: User = {
          email: data.email,
          nickname: data.nickname,
          id: res.user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await firebase
          .firestore()
          .collection("/users")
          .doc(res.user.uid)
          .set(userData);
        await res.user?.sendEmailVerification();
        dispatch({ type: NEED_VERIFICATION });
        dispatch({ type: SET_USER, payload: userData });
      }
      //Error нельзя, решения не нашел(
    } catch (e: any) {
      onError();
      dispatch({ type: SET_ERROR, payload: e.message });
    }
  };
};

export const getUserById = (
  id: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const user = await firebase
        .firestore()
        .collection("/users")
        .doc(id)
        .get();
      if (user.exists) {
        const userData = user.data() as User;
        dispatch({ type: SET_USER, payload: userData });
      }
    } catch (e: any) {
      //Фикс
      dispatch({ type: SET_ERROR, payload: e.message });
    }
  };
};

export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispacth) => {
    dispacth({ type: SET_LOADING, payload: value });
  };
};

export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispacth) => {
    dispacth({
      type: SET_ERROR,
      payload: msg,
    });
  };
};

export const signOut = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispacth) => {
    try {
      dispacth(setLoading(true));
      await firebase.auth().signOut();
      dispacth({ type: SIGN_OUT });
    } catch (e: any) {
      dispacth(setLoading(false));
    }
  };
};

export const setNeedVerification = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return (dispatch) => {
    dispatch({ type: NEED_VERIFICATION });
  };
};

export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispacth) => {
    dispacth({
      type: SET_SUCCESS,
      payload: msg,
    });
  };
};

export const sendPasswordResetEmail = (
  email: string,
  successMsg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispacth) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispacth(setSuccess(successMsg));
    } catch (e: any) {
      dispacth(setError(e.message));
    }
  };
};
