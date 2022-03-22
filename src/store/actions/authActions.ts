import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import {
  SignUpData,
  AuthAction,
  SET_USER,
  SIGN_OUT,
  SET_ERROR,
  SignInData,
} from "../types";
import { RootState } from "..";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const signUp = (data: SignUpData) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }
      );
    } catch (e: any) {
      dispatch({ type: SET_ERROR, payload: e.message });
    }
  };
};

export const signIn = (data: SignInData) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }
      );
      //Error нельзя, решения не нашел(
    } catch (e: any) {
      dispatch({ type: SET_ERROR, payload: e.message });
    }
  };
};

export const authWithGoogle = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const provider = new GoogleAuthProvider();
      auth.languageCode = "rus";
      provider.setCustomParameters({
        login_hint: "user@example.com",
      });
      signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
      });
    } catch (e: any) {
      dispatch({ type: SET_ERROR, payload: e.message });
    }
  };
};

export const authStateChangedHandler = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: SET_USER,
          payload: {
            nickname: user.displayName,
            id: user.uid,
            email: user.email,
          },
        });
      } else {
        dispatch({ type: SIGN_OUT });
      }
    });
  };
};

export const signOutHandler = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({ type: SIGN_OUT });
      signOut(auth);
    } catch (e: any) {
      dispatch({ type: SET_ERROR, payload: e.message });
    }
  };
};

// export const getUserById = (
//   id: string
// ): ThunkAction<void, RootState, null, AuthAction> => {
//   return async (dispatch) => {
//     try {
//       const user = await firebase
//         .firestore()
//         .collection("/users")
//         .doc(id)
//         .get();
//       if (user.exists) {
//         const userData = user.data() as User;
//         dispatch({ type: SET_USER, payload: userData });
//       }
//     } catch (e: any) {
//       //Фикс
//       dispatch({ type: SET_ERROR, payload: e.message });
//     }
//   };
// };
