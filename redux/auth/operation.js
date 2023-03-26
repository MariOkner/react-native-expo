import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '../../firebase';

import { authSlice } from '../../redux/auth/reducer';

import helpers from '../../helpers';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const singUpUser =
  ({ email, password, userName, image }, done) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        throw new Error('Помилка реєстрації');
      });

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: userName,
      });

      const { uid, displayName } = await auth.currentUser;

      if (image) {
        const imageRef = await fetch(image);
        const imageData = await imageRef.blob();
        const storageRef = ref(storage, `userImages/${uid}`);
        await uploadBytes(storageRef, imageData).catch((error) => {});
      }

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
          userImageURL: await helpers.getUserImageURL(uid),
        })
      );
    } catch (error) {
      helpers.showWarningMsg(error.message);
    }
    done();
  };

export const singInUser =
  ({ email, password }, done) =>
  async (dispatch, getState) => {
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      helpers.showWarningMsg('Невірний логін або пароль');
    });
    done();
  };

export const singOutUser = () => async (dispatch, getState) => {
  try {
    await auth.signOut().catch((error) => {
      throw new Error('Помилка виходу');
    });
    dispatch(authSignOut());
  } catch (error) {
    helpers.showWarningMsg(error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        userName: user.displayName,
        userImageURL: await helpers.getUserImageURL(user.uid),
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
