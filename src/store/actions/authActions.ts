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
import { auth, db } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export const signUp = (data: SignUpData) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          dispatch({
            type: SET_USER,
            payload: {
              nickname: user.displayName,
              id: user.uid,
              email: user.email,
              photoURL: user.photoURL,
            },
          });
          const usersRef = collection(db, "users");
          addDoc(usersRef, {
            uid: auth.currentUser?.uid,
            displayName:
              auth.currentUser?.displayName || auth.currentUser?.email,
            email: auth.currentUser?.email,
            photoUrl: auth.currentUser?.photoURL,
          });
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
          dispatch({
            type: SET_USER,
            payload: {
              nickname: user.displayName,
              id: user.uid,
              email: user.email,
            },
          });
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
        dispatch({
          type: SET_USER,
          payload: {
            nickname: user.displayName,
            id: user.uid,
            email: user.email,
          },
        });
        console.log(user);
        const usersRef = collection(db, "users");
        let storage: any[] = [];

        onSnapshot(usersRef, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            storage.push({ ...doc.data() });
          });
        });

        if (storage.find((el) => el.uid === auth.currentUser?.uid)) {
          addDoc(usersRef, {
            uid: auth.currentUser?.uid,
            displayName:
              auth.currentUser?.displayName || auth.currentUser?.email,
            email: auth.currentUser?.email,
            photoUrl: auth.currentUser?.photoURL,
          });
          storage = [];
        }
      });
    } catch (e: any) {
      dispatch({ type: SET_ERROR, payload: e.message });
    }
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
