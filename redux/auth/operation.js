import {auth} from "../../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, currentUser} from "firebase/auth";

import {authSlice} from "../../redux/auth/reducer";
import {isAsyncThunkAction} from "@reduxjs/toolkit";
import {async} from "@firebase/util";

export const singUpUser =
  ({email, password, nickName}) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: nickName,
      });

      const {uid, displayName} = await auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickName: displayName,
        }),
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const singInUser =
  ({email, password}) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user2", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const singOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
      };

      dispatch(authSlice.actions.authStateChange({stateChange: true}));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};
