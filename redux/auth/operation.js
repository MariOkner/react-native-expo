import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, currentUser } from 'firebase/auth';

import { authSlice } from '../../redux/auth/reducer';

import { isAsyncThunkAction } from '@reduxjs/toolkit';
import { async } from '@firebase/util';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const singUpUser =
  ({ email, password, userName }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: userName,
      });

      const { uid, displayName } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
        })
      );
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const singInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log('user2', user);
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message);
    }
  };

export const singOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        userName: user.displayName,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
