// import firebaseConfig from "../../firebase/config";
import db from "../../firebase/config";

export const authSingUpUser = () => async (dispatch, getSatte) => {
  try {
    const user = await db.auth().createUserWithEmailAndPassword();
    console.log("user", user);
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

export const authSingInUser = () => async (dispatch, getSatte) => {};

export const authSingOutUser = () => async (dispatch, getSatte) => {};
