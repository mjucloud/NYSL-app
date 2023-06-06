// Import the functions you need from the SDKs you need  ;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useDatabaseValue } from "@react-query-firebase/database";
import { getDatabase, onValue, ref, set } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsvfIcVL9UTTjEPqpfRFa278mIyahM0Gs",
  authDomain: "nysl-app-23.firebaseapp.com",
 // databaseURL: "https://nysl-app-23-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nysl-app-23",
  storageBucket: "nysl-app-23.appspot.com",
  messagingSenderId: "784199603135",
  appId: "1:784199603135:web:06d9d8cd6f171d5ac1c70a",
  measurementId: "G-JTN84BVY88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app)
console.log(database)
console.log(analytics)
export const useData = (path, transform) => {
  const { data, isLoading, error } = useDatabaseValue(path, ref(database, path), { subscribe: true });
  const value = (!isLoading && !error && transform) ? transform(data) : data;

  return [ value, isLoading, error ];
};

console.log(ref(database, '//schedule'))