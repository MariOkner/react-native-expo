import {auth} from "../../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";

export const singUpUser =
  ({email, password, nickname}) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const singInUser = () => async (dispatch, getState) => {};

export const singOutUser = () => async (dispatch, getState) => {};
