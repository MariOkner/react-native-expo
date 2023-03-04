// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCKjtsA1MSA-VckNReRrg9PDjDQJkd1odw',
  authDomain: 'rn-social-7af25.firebaseapp.com',
  projectId: 'rn-social-7af25',
  storageBucket: 'rn-social-7af25.appspot.com',
  messagingSenderId: '115308355788',
  appId: '1:115308355788:web:a45f0f0d3fb07f7ec32269',
  measurementId: 'G-B6RP2LBDP9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, doc, setDoc, storage, ref, uploadBytesResumable, getDownloadURL };
