// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsvfIcVL9UTTjEPqpfRFa278mIyahM0Gs",
  authDomain: "nysl-app-23.firebaseapp.com",
  databaseURL: "https://nysl-app-23-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nysl-app-23",
  storageBucket: "nysl-app-23.appspot.com",
  messagingSenderId: "784199603135",
  appId: "1:784199603135:web:06d9d8cd6f171d5ac1c70a",
  measurementId: "G-JTN84BVY88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);