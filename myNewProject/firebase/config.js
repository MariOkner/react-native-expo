import * as firebase from "firebase";
import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "API_KEY",
//   authDomain: "DOMAIN",
//   databaseURL: "URL",
//   projectId: "PROJECT_ID",
//   storageBucket: "STORAGE",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID",
// };

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// export { auth };

////
// //// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
// //// TODO: Add SDKs for Firebase products that you want to use
// //// https://firebase.google.com/docs/web/setup#available-libraries

// //// Your web app's Firebase configuration
// //// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyDBLsl6P9dwCHVOetr7dwXi8evJ6HWTdN4",
  authDomain: "rn-social-47bbc.firebaseapp.com",
  projectId: "rn-social-47bbc",
  storageBucket: "rn-social-47bbc.appspot.com",
  messagingSenderId: "412328222811",
  appId: "1:412328222811:web:59a9d8f8fc765c44fbdf7e",
  measurementId: "G-BXTGZ72KCD",
};

// //// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase.initializeApp(firebaseConfig);
